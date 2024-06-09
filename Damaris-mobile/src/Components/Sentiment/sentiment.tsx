import axios from "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
interface UserReply {
    Reply: string;
    Sentiment: number;
}

const sentimentToTone: Record<number, string> = {
    0.9: "Excited",
    0.85: "Appreciative",
    0.8: "Eager",
    0.75: "Positive",
    0.7: "Warm",
    0.65: "Content",
    0.6: "Grateful",
    0.55: "Friendly",
    0.5: "Empathetic",
    0.45: "Understanding",
    0.4: "Supportive",
    0.35: "Curious",
    0.3: "Patient",
    0.25: "Polite",
    0.2: "Frustrated",
    0.15: "Annoyed",
    0.1: "Apologetic",
    0.05: "Regretful",
    0.0: "Neutral",
};

//List of user replies
const userReplies: UserReply[] = [];

interface UserReply {
    Reply: string;
    Sentiment: number;
}


function computeOverallSentiment(userReplies: UserReply[]): number | null {
    if (userReplies.length === 0) {
        return null; // No data to analyze
    }

    // Calculate the average sentiment score
    const totalSentiment = userReplies.reduce((sum, reply) => sum + reply.Sentiment, 0);
    const overallSentiment = totalSentiment / userReplies.length;

    return overallSentiment;
}

function getConsiderateTone(userReplies: UserReply[]): string {
    const overallSentiment = computeOverallSentiment(userReplies);
    if (overallSentiment === null) {
        return "Neutral"; // Default to Neutral if no data
    }
    const userTone = sentimentToTone[overallSentiment] || "Neutral";
    return userTone;
}



async function analyzeReplySentimentWithCognitiveServices(text: string): Promise<number | null> {
    try {
        const apiKey = process.env.EXPO_PUBLIC_TEXT_ANALYTICS_API_KEY;
        const endpoint = process.env.EXPO_PUBLIC_TEXT_ANALYTICS_ENDPOINT;

        if (!apiKey || !endpoint) {
            console.error("API key or endpoint not provided in environment variables.");
            return null;
        }

        const response = await axios.post(endpoint, { documents: [{ id: "1", text }] }, {
            headers: {
                "Ocp-Apim-Subscription-Key": apiKey,
                "Content-Type": "application/json",
            },
        });

        const sentimentScore = response.data.documents[0].confidenceScores.positive;

        const newUserReply: UserReply = {
            Reply: text,
            Sentiment: sentimentScore,
        };

        // Add the new UserReply to the list
        userReplies.push(newUserReply);


        return sentimentScore;
    } catch (error) {
        console.error("Error analyzing sentiment:", error);
        return null; // Return null on error
    }
}


function generateConsiderateSystemPrompt(userTone: string, baseRequest: string): string {
    // Customize the considerate prompt based on user tone and base request
    // You can add more logic here as needed
    const prompt = `
        You are a customer service rep from a shipping company.
        
        Considering that the overall tone of the customer is  ` + userTone +
        `, generate an appropriate and sensitive message that is meant to ` + baseRequest;
        
        `Usertone: Happy
        Baserequest: Ask for your shipping address?
        Response: Thank you so much. I’m glad to have been of service. Now, can you let me know to what address you're thinking about shipping your item?
        
        Usertone: Curious
        Baserequest: Ask for your shipping address?
        Response: Certainly! It’s great to assist you. If you have any specific questions or need help with anything, feel free to ask. 
        
        Usertone: Frustrated
        Baserequest: Ask for your shipping address?
        Response: I apologize for any confusion, but it seems there might be a mix-up. 
        The requests you’ve mentioned appear to be related to shipping addresses, but I don’t have any context or specific item to ship.
        Could you please provide more details or clarify your request? I’d be happy to assist! 
        
        Usertone:` + userTone + `
        Baserequest: ` + baseRequest + `
        Response: 
        `;

    return prompt;
}



async function createUserSentimentConsiderateSystemPrompt(userReplies: UserReply[], baseRequest: string): Promise<string> {
    try {
        // Initialize the OpenAI client
        // Initialize the OpenAI client
        const openAIEndPoint = process.env.EXPO_PUBLIC_AZ_OPENAI_ENDPOINT ;
        const openAIKEY = process.env.EXPO_PUBLIC_AZ_OPENAI_KEY;
        const openAIModel = process.env.EXPO_PUBLIC_AZ_OPENAI_MODEL;
        const openAIDeployment = process.env.EXPO_PUBLIC_AZ_OPENAI_MODEL || '';


        const scope = "https://cognitiveservices.azure.com/.default";
        const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);

        const azureOpenAIKEY =  new AzureKeyCredential(openAIKEY || "");
        const client = new OpenAIClient(openAIEndPoint || "", azureOpenAIKEY);
        const deployment = process.env.EXPO_PUBLIC_AZ_OPENAI_MODEL || '';
        const apiVersion = "0301";

        const azureClient = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });


        // Find the user's overall tone from the sentiment analysis of the list of replies
        const userTone = getConsiderateTone(userReplies);

        // Craft the considerate prompt
        const consideratePrompt = generateConsiderateSystemPrompt(userTone, baseRequest);
        const prompt = [consideratePrompt];

        // Generate the final response using Azure OpenAI
        const { id, created, choices, usage } = await client.getCompletions(openAIDeployment, [consideratePrompt]);
        //const { id, created, choices, usage } = await azureClient.completions({ prompt, model: openAIDeployment, max_tokens: 128});
        const response = choices[0].text.trim();

        return response;
    } catch (error) {
        console.error("Error generating considerate prompt:", error);
        return "Oops, something went wrong!";
    }
}

async function generateQNASystemReply(baseRequest: string, userTone: string): Promise<string> {
    try {
        // Initialize the OpenAI client
        const openAIEndPoint = process.env.EXPO_PUBLIC_AZ_OPENAI_ENDPOINT || '';
        const openAIKEY = process.env.EXPO_PUBLIC_AZ_OPENAI_KEY || '';
        const openAIDeployment = process.env.EXPO_PUBLIC_AZ_OPENAI_MODEL || '';

        const azureOpenAIKEY =  new AzureKeyCredential(openAIKEY );
        const client = new OpenAIClient(openAIEndPoint, azureOpenAIKEY);


        // Craft the considerate prompt
        const consideratePrompt = reformatQNASystemPrompt(userTone, baseRequest);

        console.log("New prompt to customer: " + consideratePrompt);

        // Generate the final response using Azure OpenAI
        const { id, created, choices, usage } = await client.getCompletions(openAIDeployment, [consideratePrompt]);
        //const { id, created, choices, usage } = await client.getCompletions(openAIDeployment, [consideratePrompt]);
        const response = choices[0].text.trim();

        return response;
    } catch (error) {
        console.error("Error generating considerate prompt:", error);
        return " ";
    }
}


function reformatQNASystemPrompt(userTone: string, systemPrompt: string): string {
    // Customize the considerate prompt based on user tone and base request
    // You can add more logic here as needed
    const prompt = `
        You are a customer service rep at a shipping company.        
        Considering that your customer is feeling` +  userTone + `, ` +
        `generate an appropriate, succinct and customer tone sensitive message that summarizes the message below .
        
        --------
        ` + systemPrompt +
        `------------       
        
        `;

    return prompt;
}

export default generateQNASystemReply;

