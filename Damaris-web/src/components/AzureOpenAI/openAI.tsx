import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider,  } from "@azure/identity";
import {AzureKeyCredential, OpenAIClient} from "@azure/openai";


export async function azureOpenAICompletion(request : string, reformatMessage : boolean, userTone : string) {
    try {
        // Initialize the OpenAI client
        const openAIEndPoint = import.meta.env.EXPO_PUBLIC_AZ_OPENAI_ENDPOINT || '';
        const openAIKEY = import.meta.env.EXPO_PUBLIC_AZ_OPENAI_KEY || '';
        const openAIDeployment = import.meta.env.EXPO_PUBLIC_AZ_OPENAI_MODEL || '';

        const azureOpenAIKEY =  new AzureKeyCredential(openAIKEY );
        const client = new OpenAIClient(openAIEndPoint, azureOpenAIKEY);


        // Craft the considerate prompt
        const consideratePrompt =  (reformatMessage)? await reformatQNAPrompt(userTone, request) : await reformatSystemPrompt(userTone, request);

        console.log("New prompt to customer: " + consideratePrompt);

        // Generate the final response using Azure OpenAI
        const completions = await client.getCompletions(openAIDeployment, [consideratePrompt]);
        const response = completions.choices[0].text.trim();

        return response;
    } catch (error) {
        console.error("Error generating considerate prompt:", error);
        return " ";
    }
}


export async function azureOpenAIChat(request: string) {
    const scope = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
    const deployment = "gpt-35-turbo";
    const apiVersion = "2024-04-01-preview";
    const client = new AzureOpenAI({azureADTokenProvider, deployment, apiVersion});

    const systemContext = 'You are an experienced customer representative for a shipping company. ' +
        'You show empathy for customers and have a great attitude.'

    const userTone = 'nervous';

    const prompt = reformatSystemPrompt(userTone, request );

    const result = await client.chat.completions.create({
        messages: [
            {role: "system", content: systemContext},
            {role: "user", content: prompt},
        ],
        model: '',
    });

    for (const choice of result.choices) {
        console.log(choice.message);
    }

    return result.choices[0].message.content;
}

function reformatSystemPrompt(userTone: string, request: string): string {
    // Customize the considerate prompt based on user tone and base request
    // You can add more logic here as needed
    const prompt = `
        You are a customer service rep at a shipping company.        
        Considering that your customer is feeling` +  userTone + `, ` +
        `Answer the question below by being efficiently short and asking the user if they need more clarity on specific points.  
        Recognize that the user is curious and engaging with him through his name Gerard. 
        --------
        ` + request +
        `------------       
        
        `;

    return prompt;
}


function reformatQNAPrompt(userTone: string, request: string): string {
    // Customize the considerate prompt based on user tone and base request
    // You can add more logic here as needed
    const prompt = `
        You are a customer service rep at a shipping company called Pitney Bowes.
        Your name is Damaris.        
        Considering that your customer is feeling` +  userTone + `, ` +
        `recreate the message below to best engage the customer and match his or her energy.
        --------
        ` + request +
        `------------       
        
        `;

    return prompt;
}