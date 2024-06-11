import {
	AudioConfig,
	ResultReason,
	SpeakerAudioDestination,
	SpeechConfig,
	SpeechSynthesizer,
} from "microsoft-cognitiveservices-speech-sdk";

async function convertTextToSpeech(textToSpeech: string) {
	try {
		const subscriptionKey = import.meta.env.VITE_SPEECH_SUBSCRIPTION_KEY;
		const serviceRegion = import.meta.env.VITE_SPEECH_SERVICE_REGION;

		const speechConfig = SpeechConfig.fromSubscription(
			subscriptionKey,
			serviceRegion
		);

		const player = new SpeakerAudioDestination();
		const audioConfig = AudioConfig.fromSpeakerOutput(player);

		let synthesizer: SpeechSynthesizer | undefined = new SpeechSynthesizer(
			speechConfig,
			audioConfig
		);

		synthesizer.speakTextAsync(
			textToSpeech,
			result => {
				let text;
				if (result.reason === ResultReason.SynthesizingAudioCompleted) {
					text = `synthesis finished for "${textToSpeech}".\n`;
				} else if (result.reason === ResultReason.Canceled) {
					text = `synthesis failed. Error detail: ${result.errorDetails}.\n`;
				}
				synthesizer!.close();
				synthesizer = undefined;
				return text;
			},
			function (err) {
				synthesizer!.close();
				synthesizer = undefined;
				return `Error: ${err}.\n`;
			}
		);
	} catch (error) {
		console.error("Error converting text to speech:", error);
	}
}

export default convertTextToSpeech;
