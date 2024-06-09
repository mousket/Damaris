import transcribeAudioFromMicrophone from "../Speech/audioToText";
import convertTextToSpeech from "../Speech/textToAudio";
import { openAICall} from "../AzureOpenAI/openAI";


// Function to get answers based on user input
export async function getAnswersFromQNA() {
    const openingMessage = "Hi! How can I help you?";
    const recreatedFirstPrompt = await openAICall(openingMessage, false);
    console.log("Recreated What can I help you into:  " + recreatedFirstPrompt)

    //System speaks the recreated opening message
    await convertTextToSpeech(recreatedFirstPrompt);

    // Get user input (e.g., from voice transcription)
    let userQuestion = await transcribeAudioFromMicrophone();
    while (
        !userQuestion.toLowerCase().includes('error') ||
        !userQuestion.toLowerCase().includes('no speech detected') ||
        !userQuestion.toLowerCase().includes('something else') ||
          !userQuestion.toLowerCase().includes('no')) {

        console.log("Customer Reply: " + userQuestion);

        //System replies to the customer message
        const firstAnswer = await openAICall(userQuestion, true);
        console.log("Damaris Reply: " + firstAnswer);

        // User responds to message or ask another question
        userQuestion = await transcribeAudioFromMicrophone();
    }
}



