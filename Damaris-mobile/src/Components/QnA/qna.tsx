import transcribeAudioFromMicrophone from "../Speech/audioToText";
import convertTextToSpeech from "../Speech/textToAudio";
import generateQNASystemReply from "../Sentiment/sentiment";
import {azureOpenAIChat, azureOpenAICompletion} from "../AzureOpenAI/openAI";


// Function to get answers based on user input
async function getAnswersFromQNA() {
    let userQuestion = '';
    //while (!userQuestion.toLowerCase().includes('something else') ||
    //  !userQuestion.toLowerCase().includes('no')) {
        // Get user input (e.g., from voice transcription)
        const firstPrompt = "What can I help you with";
        //const recreatedFirstPrompt = await generateQNASystemReply(firstPrompt,'sad');

        const recreatedFirstPrompt = await azureOpenAICompletion(firstPrompt);
        convertTextToSpeech(recreatedFirstPrompt);


        // Assume you have a way to get user input (e.g., from microphone)
        // For this example, we'll use a hardcoded question:

        userQuestion = await transcribeAudioFromMicrophone();
        console.log("Customer Question: " + userQuestion);

        const firstAnswer = await azureOpenAICompletion(userQuestion);
        console.log(firstAnswer);

        const secondAnswer = await azureOpenAIChat(userQuestion);
        console.log(secondAnswer);

        return secondAnswer;

        /*
        // Submit the question to the project
        const qnaAPIResponse = await makeQNARequest(userQuestion);

        /*
        // Display the answers
        for (const answer of qnaAPIResponse.answers) {
            console.log(`Answer: ${answer.answer}`);
            console.log(`Confidence: ${answer.confidence}`);
            console.log(`Source: ${answer.source}`);
        }
        */

        /*
        const qnaResponse = qnaAPIResponse.answers[0].answer;
        console.log("QNA Response: " + qnaResponse);

        const contextBasedReponse = await generateQNASystemReply(qnaResponse,'sad')
        convertTextToSpeech(contextBasedReponse);
        console.log("OpenAI Response:" + contextBasedReponse);

        const finalSystemPrompt =  "What else can I help you with or would you like to do something";
        const systemPrompt = await generateQNASystemReply(finalSystemPrompt,'sad');
        convertTextToSpeech(systemPrompt);


        return qnaResponse.answers[0].answer;

        */
    //}
}


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

export default getAnswersFromQNA;
