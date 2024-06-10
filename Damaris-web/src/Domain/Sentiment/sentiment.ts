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


export function getGeneralUserSentiment(): string {
	const overallSentiment = computeOverallSentiment();
	if (overallSentiment === null) {
		return "Neutral"; // Default to Neutral if no data
	}
	const userTone = sentimentToTone[overallSentiment] || "Neutral";
	return userTone;
}

export function computeOverallSentiment(): number | null {
	const userRepliesContent = useContext(UserRepliesContext);

	if (userRepliesContent?.userReplies.length === 0) {
		return 6;
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




//Use to improve System Replies and questions to the user.
export function reformatSystemMessage(request: string): string {
	const userTone = getGeneralUserSentiment();

	const prompt = `        
        recreate the message below to engage a customer who is` +  userTone + `.` +  `
        --------
        ` + request + `
        ------------  `;
	return prompt;
}


export function reformatQnaMessage(baseRequest: string): string {
	// Customize the considerate prompt based on user tone and base request
	const mood = computeOverallSentiment();
	const prompt = `
        Generate an appropriate and sensitive message to a user's mood following the format below:
        
        Mood: 0.8
        Baserequest: Ask for your shipping address?
        Response: Thank you so much. I’m glad to have been of service. Now, can you let me know to what address you're thinking about shipping your item?
        
        Mood: 0.6
        Baserequest: Ask for your shipping address?
        Response: Certainly! It’s great to assist you. If you have any specific questions or need help with anything, feel free to ask. 
        
        Mood: 0.2
        Baserequest: Ask for your shipping address?
        Response: I apologize for any confusion, but it seems there might be a mix-up. 
        The requests you’ve mentioned appear to be related to shipping addresses, but I don’t have any context or specific item to ship.
        Could you please provide more details or clarify your request? I’d be happy to assist! 
        
        Mood: ` + mood + `
        Baserequest: ` + baseRequest + `
        Response: 
        `;

	return prompt;
}

/*
//To answer question from the user
export function reformatQnaMessage(request: string): string {
	// Customize the considerate prompt based on user tone and base request
	// You can add more logic here as needed
	const userTone = getGeneralUserSentiment();

	const prompt =
		`
        Answer the question below as shortly as you can and modify your language to accommodate a customer be mindful of a who is feeling` +
		userTone +
		`.` +
		`
        --------
        ` +
		request +
		`
        ------------
        `;

	return prompt;
}
*/

