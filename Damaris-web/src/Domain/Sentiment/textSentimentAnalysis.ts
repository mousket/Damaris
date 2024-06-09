import axios from "axios";

async function getSentimentScore(text: string): Promise<number | null> {
    try {
        const apiKey = import.meta.env.VITE_TEXT_ANALYTICS_API_KEY; // Use environment variable
        const endpoint = import.meta.env.VITE_TEXT_ANALYTICS_ENDPOINT; // Use environment variable

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
        return sentimentScore;
    } catch (error) {
        console.error("Error analyzing sentiment:", error);
        return null;
    }
}
export default getSentimentScore;

// Example usage:
const userText = "I love this product! It's amazing.";

getSentimentScore(userText)
    .then((score) => {
        if (score !== null) {
            console.log(`Sentiment score: ${score}`);
        } else {
            console.log("Sentiment analysis failed.");
        }
    })
    .catch((error) => console.error("Error:", error));
