import { UserRepliesContext } from "@/main";
import {useContext} from "react";

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


function getGeneralUserSentiment(): string {
	const overallSentiment = computeOverallSentiment();
	if (overallSentiment === null) {
		return "Neutral"; // Default to Neutral if no data
	}
	const userTone = sentimentToTone[overallSentiment] || "Neutral";
	return userTone;
}

function computeOverallSentiment(): number | null {

	const userRepliesContent = useContext(UserRepliesContext);

	if (userRepliesContent?.userReplies.length === 0) {
		return null; // No data to analyze
	}

	const userReplyList = userRepliesContent?.userReplies;

	const userReplyListLength = userReplyList?.length ?? 0;
	// Calculate the average sentiment score
	const totalSentiment = userReplyList?.reduce(
		(sum, reply) => sum + reply.Sentiment,
		0
	) || 1;
	const overallSentiment = totalSentiment / userReplyListLength;

	return overallSentiment;
}


export function generateConsiderateSystemPrompt(
	userTone: string,
	baseRequest: string
): string {
	// Customize the considerate prompt based on user tone and base request
	// You can add more logic here as needed
	const prompt = `
        You are a customer service rep from a shipping company.
        reimagine the message below to properly engage customer feeling ` +  userTone + `,
        --------`
      	+  baseRequest + `
        
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

export default getGeneralUserSentiment;