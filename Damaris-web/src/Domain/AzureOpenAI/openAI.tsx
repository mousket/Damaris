//@ts-nocheck
import {
	AzureKeyCredential,
	OpenAIClient,
	GetChatCompletionsOptions,
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

export async function askOpenAI(prompt: string): Promise<void> {
	const speechConfig = SpeechConfig.fromSubscription(speechKey, speechRegion);

	// The language of the voice that speaks.
	speechConfig.speechSynthesisVoiceName = "en-US-JennyMultilingualNeural";
	const audioOutputConfig = AudioConfig.fromDefaultSpeakerOutput();
	const speechSynthesizer = new SpeechSynthesizer(
		speechConfig,
		audioOutputConfig
	);

	// Ask Azure OpenAI
	const client = new OpenAIClient(
		openAIEndPoint,
		new AzureKeyCredential(openAIKEY)
	);
	const completionsOptions: GetChatCompletionsOptions = {
		messages: [{ role: "system", content: systemMessage }],
		//deploymentName: openAIDeployment,
		maxTokens: 400,
		temperature: 0.1,
	};

	// Craft the considerate prompt
	const consideratePrompt = reformatSystemMessage(prompt);

	const responseStream = await client.streamCompletions(
		openAIDeployment,
		[consideratePrompt],
		completionsOptions
	);
	const gptBuffer: string[] = [];

	for await (const completionUpdate of responseStream) {
		const message = completionUpdate.choices[0]?.text;
		if (!message) {
			continue;
		}

        gptBuffer.push(message);

        if (sentenceSeparators.some((separator) => message.includes(separator))) {
            const sentence = gptBuffer.join("").trim();
            if (sentence) {
                console.log(sentence);
                //System Text To Speech
                await convertTextToSpeech(sentence);
                gptBuffer.length = 0; // Clear the buffer
            }
        }

    }
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


//Parameters: request to send to open AI
//parameters  isQna boolean
export async function openAICall(request: string, isQna: boolean): Promise<string> {
	// Initialize your speech configuration (if needed)
	const speechConfig = SpeechConfig.fromSubscription(speechKey, speechRegion);

	// Initialize your OpenAI client
	const client = new OpenAIClient(
		openAIEndPoint,
		new AzureKeyCredential(openAIKEY)
	);

	// Get the response stream
	const responseStream = await client.streamCompletions(
		openAIDeployment,
		[consideratePrompt],
		completionsOptions
	);

	let result = "";
	/*
        // Capture the first response
        let result = "";
        for await (const response of responseStream) {
            result = response.choices[0].text;
            break; // Exit the loop after the first response
        }

        return result;
     */

	const gptBuffer: string[] = [];
	for await (const completionUpdate of responseStream) {
		const message = completionUpdate.choices[0]?.text;
		if (!message) {
			continue;
		}

		gptBuffer.push(message);

		if (sentenceSeparators.some((separator) => message.includes(separator))) {
			const sentence = gptBuffer.join("").trim();
			if (sentence) {
				result = sentence;
				//System Text To Speech
				await convertTextToSpeech(sentence);
				gptBuffer.length = 0; // Clear the buffer
			}
		}
		break;
	}
	return result;
}