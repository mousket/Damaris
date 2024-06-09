/*
import transcribeAudioFromMicrophone from "../Speech/audioToText";
import convertTextToSpeech from "../Speech/textToAudio";
*/
import { azureOpenAICompletion} from "../AzureOpenAI/openAI";


// Function to get answers based on user input
async function getAnswersFromQNA() {
	let userQuestion = '';
	//while (!userQuestion.toLowerCase().includes('something else') ||
	//  !userQuestion.toLowerCase().includes('no')) {

	const firstPrompt = "HI! How can I help you?";

	const userTone = "in need of motivation";

	const reformatMessage  = true;
	const recreatedFirstPrompt = await azureOpenAICompletion(userTone, true, firstPrompt);
	console.log("Recreated What can I help you into:  " + recreatedFirstPrompt)
	//await convertTextToSpeech(recreatedFirstPrompt || firstPrompt);


	// Get user input (e.g., from voice transcription)
	//userQuestion = await transcribeAudioFromMicrophone();
	userQuestion = "How can I change the delivery date for my shipment";
	console.log("Customer Question: " + userQuestion);


	const firstAnswer = await azureOpenAICompletion(userTone, !reformatMessage, userQuestion || 'Can I change the delivery for my shipment package.');
	console.log(firstAnswer);

	return firstAnswer;


}

/*
async function makeQNARequest(userQuestion : string) {
	const url = process.env.EXPO_PUBLIC_AZURE_QNA_URL || ''
	const subscriptionKey = process.env.EXPO_PUBLIC_AZURE_QNA_API_KEY || '';

	const requestBody = {
		top: 3,
		question: userQuestion,
		includeUnstructuredSources: true,
		confidenceScoreThreshold: '0.6',
		answerSpanRequest: {
			enable: true,
			topAnswersWithSpan: 1,
			confidenceScoreThreshold: '0.7',
		},
		filters: {
			metadataFilter: {
				logicalOperation: 'AND',

			},
		},
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Ocp-Apim-Subscription-Key': subscriptionKey,
			},
			body: JSON.stringify(requestBody),
		});

		if (response.ok) {
			const data = await response.json();
			console.log('Response:', data);
			return data;
		} else {
			console.error('Error:', response.statusText);
		}
	} catch (error) {
		console.error('An error occurred:', error);
	}
}
*/
export default getAnswersFromQNA;
