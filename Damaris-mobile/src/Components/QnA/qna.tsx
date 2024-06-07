import transcribeAudioFromMicrophone from "../Speech/audioToText";
import convertTextToSpeech from "../Speech/textToAudio";
import generateQNASystemReply from "../Sentiment/sentiment";



// Function to get answers based on user input
async function getAnswersFromUserInput() {
    let question = '';
    while (!question.toLowerCase().includes('something else')) {
        // Get user input (e.g., from voice transcription)
        console.log('What is your question?');

        // Assume you have a way to get user input (e.g., from microphone)
        // For this example, we'll use a hardcoded question:
        //question = await transcribeAudioFromMicrophone();
        question = 'when will my package arrive?';

        // Submit the question to the project
        const qnaAPIResponse = await makeQNARequest(question);

        // Display the answers
        for (const answer of qnaAPIResponse.answers) {
            console.log(`Answer: ${answer.answer}`);
            console.log(`Confidence: ${answer.confidence}`);
            console.log(`Source: ${answer.source}`);
        }

        const qnaResponse = qnaAPIResponse.answers[0].answer;

        const contextBasedReponse = await generateQNASystemReply(qnaResponse,'sad')
        convertTextToSpeech(contextBasedReponse);
        return qnaResponse.answers[0].answer;
    }
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

export default getAnswersFromUserInput;
