import {
	AudioConfig,
	ResultReason,
	SpeechConfig,
	SpeechRecognizer,
} from "microsoft-cognitiveservices-speech-sdk";

const audioToTextFromFile = async (uri: Buffer) => {
	try {
		const subscriptionKey = import.meta.env.VITE_SPEECH_SUBSCRIPTION_KEY!;
		const serviceRegion = import.meta.env.VITE_SPEECH_SERVICE_REGION!;

		const speechConfig = SpeechConfig.fromSubscription(
			subscriptionKey,
			serviceRegion
		);

		const audioConfig = AudioConfig.fromWavFileInput(uri);

		const recognizer = new SpeechRecognizer(speechConfig, audioConfig);
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
};

export default audioToTextFromFile;
