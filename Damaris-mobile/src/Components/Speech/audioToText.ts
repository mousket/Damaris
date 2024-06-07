//@ts-nocheck
import {
	AudioConfig,
	SpeechConfig,
	SpeechRecognizer,
	ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";

async function transcribeAudioFromMicrophone(): Promise<string> {
	try {
		const subscriptionKey = process.env.EXPO_PUBLIC_SPEECH_SUBSCRIPTION_KEY;
		const serviceRegion = process.env.EXPO_PUBLIC_SPEECH_SERVICE_REGION;

		const speechConfig = SpeechConfig.fromSubscription(
			subscriptionKey,
			serviceRegion
		);

		const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

		const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

		console.log("Listening for audio...");

		return new Promise<string>((resolve, reject) => {
			recognizer.recognizeOnceAsync(result => {
				if (result.reason === ResultReason.RecognizedSpeech) {
					resolve(result.text);
				} else if (result.reason === ResultReason.NoMatch) {
					resolve("No speech detected.");
				} else {
					reject(new Error(`Recognition failed: ${result.reason}`));
				}
				recognizer.close();
			});
		});
	} catch (error) {
		console.error("Error transcribing audio:", error);
		return "Error transcribing audio.";
	}
}

// Example usage:
transcribeAudioFromMicrophone()
	.then(transcription => console.log("Transcription:", transcription))
	.catch(error => console.error("Error:", error));

export default transcribeAudioFromMicrophone;
