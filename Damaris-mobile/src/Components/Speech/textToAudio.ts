import {
    AudioConfig,
    SpeechConfig,
    SpeechSynthesizer,
} from "microsoft-cognitiveservices-speech-sdk";

async function convertTextToSpeech(text: string): Promise<void> {
    try {
        const subscriptionKey = process.env.EXPO_PUBLIC_SPEECH_SUBSCRIPTION_KEY;
        const serviceRegion = process.env.EXPO_PUBLIC_SPEECH_SERVICE_REGION;

        // @ts-ignore
        // @ts-ignore
        const speechConfig = SpeechConfig.fromSubscription(
            subscriptionKey || "",
            serviceRegion || ""
        );

        const audioConfig = AudioConfig.fromDefaultSpeakerOutput();

        const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

        await synthesizer.speakTextAsync(text);
    } catch (error) {
        console.error("Error converting text to speech:", error);
    }
}


export default convertTextToSpeech;