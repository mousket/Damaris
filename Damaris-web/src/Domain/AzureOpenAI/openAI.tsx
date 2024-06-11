//@ts-nocheck
import {
	AzureKeyCredential,
	OpenAIClient
} from "@azure/openai";
import {
	AudioConfig,
	SpeechConfig,
	SpeechRecognizer,
	ResultReason,
	SpeechSynthesizer,
	CancellationReason,
	CancellationDetails,
} from "microsoft-cognitiveservices-speech-sdk";

import {getGeneralUserSentiment, reformatQnaMessage, reformatSystemMessage} from "../Sentiment/sentiment"
import convertTextToSpeech from "@/Domain/Speech/textToAudio";

// Initialize the OpenAI client
const openAIEndPoint = import.meta.env.VITE_AZ_OPENAI_ENDPOINT || "";
const openAIKEY = import.meta.env.VITE_AZ_OPENAI_KEY || "";
const openAIDeployment = import.meta.env.VITE_AZ_OPENAI_MODEL || "";

const speechKey = import.meta.env.VITE_SPEECH_SUBSCRIPTION_KEY || "";
const speechRegion = import.meta.env.VITE_SPEECH_SERVICE_REGION || "";

const sentenceSeparators: string[] = [
	".",
	"!",
	"?",
	";",
	"。",
	"！",
	"？",
	"；",
	"\n",
];

const systemMessage =
	"Hello! I'm your friendly shipping assistant. How can I help you today? Just type your question," +
	" and I'll do my best to provide a quick and accurate answer. If I don't know something," +
	"1. **Summaries**: I'll provide concise answers and summaries—no long-winded speeches here!\n" +
	"2. **Eager to Help**: Ask me anything, from tracking packages to shipping rates. I'm all ears (well, virtually) and ready to assist.\n" +
	"3. **Listening Mode**: Got more questions? Fire away! I'm here to listen and learn.";
" Remember, I'm not just a robot; I'm a shipping enthusiast with a dash of humor. " +
	"I promise I won't make up stories—I'll just admit it and maybe crack a joke. Let's sail through this together!";

export async function askOpenAI(prompt: string): Promise<string> {

	const client = new OpenAIClient(
		openAIEndPoint,
		new AzureKeyCredential(openAIKEY)
	);

	// Craft the considerate prompt
	const consideratePrompt = await reformatSystemMessage(prompt);


	const result = await client.getChatCompletions(openAIDeployment, [
		{ role: "system", content: systemMessage },
		{ role: "user", content: "Can you help me?" },
		{ role: "assistant", content: "I'm to listen and help you make the best decision related to shipping?" },
		{ role: "user", content: consideratePrompt || prompt },
	]);

	return result.choices[0].message.content;
}


//Parameters: request to send to open AI
//parameters  isQna boolean
export async function openAICall(request: string, isQna: boolean): Promise<string> {

	const client = new OpenAIClient(
		openAIEndPoint,
		new AzureKeyCredential(openAIKEY)
	);

	// Craft the considerate prompt (reformatSystemPrompt(prompt) should be defined elsewhere)
	const consideratePrompt = (isQna) ? reformatQnaMessage(prompt) : reformatSystemMessage(prompt);


	const result = await client.getChatCompletions(openAIDeployment, [
		{ role: "system", content: systemMessage },
		{ role: "user", content: "Can you help me?" },
		{ role: "assistant", content: "I'm to listen and help you make the best decision related to shipping?" },
		{ role: "user", content: consideratePrompt },
	]);

	return result.choices[0].message.content;
}

export async function chatWithOpenAI(): Promise<void> {
	const speechConfig = SpeechConfig.fromSubscription(speechKey, speechRegion);
	speechConfig.speechRecognitionLanguage = "en-US";

	const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
	const speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);
	let conversationEnded = false;

	while (!conversationEnded) {
		console.log(
			"Azure OpenAI is listening. Say 'Stop' or press Ctrl-Z to end the conversation."
		);
		// Get audio from the microphone and then send it to the TTS service.
		try {
			const result = await speechRecognizer.recognizeOnceAsync();
			switch (result.reason) {
				case ResultReason.RecognizedSpeech:
					if (result.text === "Stop.") {
						console.log("Conversation ended.");
						conversationEnded = true;
					} else {
						console.log(`Recognized speech: ${result.text}`);
						const message = askOpenAI(result.text);
					}
					break;
				case ResultReason.NoMatch:
					console.log("No speech could be recognized.");
					break;
				case ResultReason.Canceled:
					const cancellationDetails = CancellationDetails.fromResult(result);
					console.log(
						`Speech Recognition canceled: ${cancellationDetails.reason}`
					);
					if (cancellationDetails.reason === CancellationReason.Error) {
						console.log(`Error details: ${cancellationDetails.errorDetails}`);
					}
					break;
			}
		} catch (error) {
			console.error("Error during speech recognition:", error);
		}
	}
}