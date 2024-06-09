import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

async function getSentimentScore(text: string) {//: Promise<number | null> {
    try {
        const apiKey = import.meta.env.VITE_TEXT_ANALYTICS_API_KEY; // Use environment variable
        const endpoint = import.meta.env.VITE_TEXT_ANALYTICS_ENDPOINT; // Use environment variable

        if (!apiKey || !endpoint) {
            console.error("API key or endpoint not provided in environment variables.");
            return null;
        }

        const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));
        const sentimentResult = await client.analyzeSentiment([text]);
        return sentimentResult[0].confidenceScores.positive;

    } catch (error) {
        console.error("Error analyzing sentiment:", error);
        return null;
    }
}
export default getSentimentScore;