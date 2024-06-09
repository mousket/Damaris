import axios from "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

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
const userReplies = {};

interface UserReply {
	Reply: string;
	Sentiment: number;
}

function computeOverallSentiment(userReplies: UserReply[]): number | null {
	if (userReplies.length === 0) {
		return null; // No data to analyze
	}

	// Calculate the average sentiment score
	const totalSentiment = userReplies.reduce(
		(sum, reply) => sum + reply.Sentiment,
		0
	);
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

async function analyzeReplySentimentWithCognitiveServices(
	text: string
): Promise<number | null> {
	try {
		const apiKey = process.env.TEXT_ANALYTICS_API_KEY;
		const endpoint = process.env.TEXT_ANALYTICS_ENDPOINT;

		if (!apiKey || !endpoint) {
			console.error(
				"API key or endpoint not provided in environment variables."
			);
			return null;
		}

		const response = await axios.post(
			endpoint,
			{ documents: [{ id: "1", text }] },
			{
				headers: {
					"Ocp-Apim-Subscription-Key": apiKey,
					"Content-Type": "application/json",
				},
			}
		);

		const sentimentScore = response.data.documents[0].confidenceScores.positive;
		return sentimentScore;
	} catch (error) {
		console.error("Error analyzing sentiment:", error);
		return null; // Return null on error
	}
}

function generateConsiderateSystemPrompt(
	userTone: string,
	baseRequest: string
): string {
	// Customize the considerate prompt based on user tone and base request
	// You can add more logic here as needed
	const prompt = `
        You are a customer service rep from a shipping company.
        
        Considering that the overall tone of the customer is  $usertone,
        generate an appropriate and sensitive message that is meant to $baserequest.
        
        Usertone: Happy
        Baserequest: Ask for your shipping address?
        Response: Thank you so much. I’m glad to have been of service. Now, can you let me know to what address you're thinking about shipping your item?
        
        Usertone: Frustrated
        Baserequest: Ask for your shipping address?
        Response: I am sorry you feel frustrated. I feel for you. Let me know quickly where you'd like to ship your item, and I promise we will be done soon.
        
        Usertone: Curious
        Baserequest: Ask for your shipping address?
        Response:
        `;

	return prompt;
}

async function createUserSentimentConsiderateSystemPrompt(
	userReplies: UserReply[],
	baseRequest: string
): Promise<string> {
	try {
		// Initialize the OpenAI client
		// Initialize the OpenAI client
		const openAIEndPoint = process.env.AZ_OPENAI_ENDPOINT;
		const openAIKEY = process.env.AZ_OPENAI_KEY;
		const openAIModel = process.env.AZ_OPENAI_MODEL;
		const openAIDeployment = import.meta.env.VITE_AZ_OPENAI_MODEL || "";

		const azureOpenAIKEY = new AzureKeyCredential(openAIKEY || "");
		const client = new OpenAIClient(openAIEndPoint || "", azureOpenAIKEY);

		// Find the user's overall tone from the sentiment analysis of the list of replies
		const userTone = getConsiderateTone(userReplies);

		// Craft the considerate prompt
		const consideratePrompt = generateConsiderateSystemPrompt(
			userTone,
			baseRequest
		);

		// Generate the final response using Azure OpenAI
		const { id, created, choices, usage } = await client.getCompletions(
			openAIDeployment,
			[consideratePrompt]
		);
		const response = choices[0].text.trim();

		return response;
	} catch (error) {
		console.error("Error generating considerate prompt:", error);
		return "Oops, something went wrong!";
	}
}

async function generateQNASystemReply(
	baseRequest: string,
	userTone: string
): Promise<string> {
	try {
		// Initialize the OpenAI client
		const openAIEndPoint = import.meta.env.VITE_AZ_OPENAI_ENDPOINT;
		const openAIKEY = import.meta.env.VITE_AZ_OPENAI_KEY;
		const openAIDeployment = import.meta.env.VITE_AZ_OPENAI_MODEL || "";

		const azureOpenAIKEY = new AzureKeyCredential(openAIKEY || "");
		const client = new OpenAIClient(openAIEndPoint || "", azureOpenAIKEY);

		// Craft the considerate prompt
		const consideratePrompt = reformatQNASystemPrompt(userTone, baseRequest);

		// Generate the final response using Azure OpenAI
		const { id, created, choices, usage } = await client.getCompletions(
			openAIDeployment,
			[consideratePrompt]
		);
		//const { id, created, choices, usage } = await client.getCompletions("<deployment ID>", [consideratePrompt]);
		const response = choices[0].text.trim();

		return response;
	} catch (error) {
		console.error("Error generating considerate prompt:", error);
		return "Oops, something went wrong!";
	}
}

function reformatQNASystemPrompt(
	userTone: string,
	baseRequest: string
): string {
	// Customize the considerate prompt based on user tone and base request
	// You can add more logic here as needed
	const prompt = `
        You are a customer service rep from a shipping company.
        
        Considering that the overall tone of the customer is  $usertone,
        generate an appropriate, succinct and customer tone sensitive message that is meant to summarize the message below .
        
        --------
        $baserequest
        ------------       
        
        `;

	return prompt;
}

export default generateQNASystemReply;
/*
// Example usage:

const userReplies: UserReply[] = [
  { Reply: "I love this product!", Sentiment: 0.8 },
  { Reply: "The service has been disappointing.", Sentiment: 0.2 },
  // Add more user replies here...
];

const baseRequest = "Please assist with my order.";

createUserSentimentConsiderateSystemPrompt(userReplies, baseRequest)
  .then((result) => console.log("Considerate prompt:", result))
  .catch((error) => console.error("Error:", error));
*/
