
import {AzureKeyCredential, OpenAIClient, GetChatCompletionsOptions} from "@azure/openai";
import {
    AudioConfig,
    SpeechConfig,
    SpeechRecognizer,
    ResultReason,
    SpeechSynthesizer, CancellationReason, CancellationDetails,
} from "microsoft-cognitiveservices-speech-sdk";

// Initialize the OpenAI client
const openAIEndPoint = process.env.EXPO_PUBLIC_AZ_OPENAI_ENDPOINT || '';
const openAIKEY = process.env.EXPO_PUBLIC_AZ_OPENAI_KEY || '';
const openAIDeployment = process.env.EXPO_PUBLIC_AZ_OPENAI_MODEL || '';

const speechKey = process.env.EXPO_PUBLIC_SPEECH_SUBSCRIPTION_KEY || '';
const speechRegion = process.env.EXPO_PUBLIC_SPEECH_SERVICE_REGION || '';

const sentenceSeparators: string[] = [".", "!", "?", ";", "。", "！", "？", "；", "\n"];

const systemMessage = "Hello! I'm your friendly shipping assistant. How can I help you today? Just type your question," +
    " and I'll do my best to provide a quick and accurate answer. If I don't know something," +
    "1. **Summaries**: I'll provide concise answers and summaries—no long-winded speeches here!\n" +
    "2. **Eager to Help**: Ask me anything, from tracking packages to shipping rates. I'm all ears (well, virtually) and ready to assist.\n" +
    "3. **Listening Mode**: Got more questions? Fire away! I'm here to listen and learn."
" Remember, I'm not just a robot; I'm a shipping enthusiast with a dash of humor. " +
"I promise I won't make up stories—I'll just admit it and maybe crack a joke. Let's sail through this together!";


export async function askOpenAI(prompt: string): Promise<void> {
    const speechConfig = SpeechConfig.fromSubscription(speechKey, speechRegion);

    // The language of the voice that speaks.
    speechConfig.speechSynthesisVoiceName = "en-US-JennyMultilingualNeural";
    const audioOutputConfig = AudioConfig.fromDefaultSpeakerOutput();
    const speechSynthesizer = new SpeechSynthesizer(speechConfig, audioOutputConfig)

    // Ask Azure OpenAI
    const client = new OpenAIClient(openAIEndPoint, new AzureKeyCredential(openAIKEY));
    const completionsOptions: GetChatCompletionsOptions = {
        messages: [
            { role: "system", content: systemMessage },
        ],
        //deploymentName: openAIDeployment,
        maxTokens: 400,
        temperature: 0.10,
    };

    // Craft the considerate prompt
    const consideratePrompt = await reformatSystemPrompt( "frustrated", prompt);
    //console.log("New prompt to customer: " + consideratePrompt);

    // Generate the final response using Azure OpenAI
    //const { id, created, choices, usage } = await client.getCompletions(openAIDeployment, [consideratePrompt], completionsOptions);
    //const response = choices[0].text.trim();
    //await speechSynthesizer.speakTextAsync(response);


    const responseStream = await client.streamCompletions(openAIDeployment, [consideratePrompt],  completionsOptions);
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
                await speechSynthesizer.speakTextAsync(sentence);
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
        console.log("Azure OpenAI is listening. Say 'Stop' or press Ctrl-Z to end the conversation.");
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
                    console.log(`Speech Recognition canceled: ${cancellationDetails.reason}`);
                    if (cancellationDetails.reason === CancellationReason.Error) {
                        console.log(`Error details: ${cancellationDetails.errorDetails}`);
                    }
                    break;
            }
        }catch (error)
        {
            console.error("Error during speech recognition:", error);
        }
    }
}


//To answer question from the user
function reformatSystemPrompt(userTone: string, request: string): string {
    // Customize the considerate prompt based on user tone and base request
    // You can add more logic here as needed
    const prompt = `        
        Answer the question below as shortly as you can and modify your language to accomodate a customer be mindful of a who is feeling` + userTone + `.` +
        ` 
        --------
        ` + request + `
        ------------ 
        `;

    return prompt;
}

/* to improve System Replies and questions to the user.
function reformatQNAPrompt(userTone: string, request: string): string {
    const prompt = `        
        recreate the message below to engage a customer who is` +  userTone + `.` +  `
        --------
        ` + request + `
        ------------  `;
    return prompt;
}
*/