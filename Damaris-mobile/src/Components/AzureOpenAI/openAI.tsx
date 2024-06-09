import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider, InteractiveBrowserCredential } from "@azure/identity";



export async function azureOpenAICompletion(request : string) {
    const scope = "https://cognitiveservices.azure.com/.default";
    //const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);

    const azureADTokenProvider = new InteractiveBrowserCredential();

    const token = await azureADTokenProvider.getToken(scope);


    const deployment = "gbt-35-turbo";//"text-davinci-003";
    const apiVersion = "2023-09-15-preview";//"2024-04-01-preview";
    const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

    const userTone = 'nervous';

    const prompt = reformatSystemPrompt(userTone, request );

    const result = await client.completions.create({ prompt, model: deployment, max_tokens: 128 });



    for (const choice of result.choices) {
        console.log(choice.text);
    }

    return result.choices[0].text;
}


export async function azureOpenAIChat(request: string) {
    const scope = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
    const deployment = "gpt-35-turbo";
    const apiVersion = "2024-04-01-preview";
    const client = new AzureOpenAI({azureADTokenProvider, deployment, apiVersion});

    const systemContext = 'You are an experienced customer representative for a shipping company. ' +
        'You show empathy for customers and have a great attitude.'

    const userTone = 'nervous';

    const prompt = reformatSystemPrompt(userTone, request );

    const result = await client.chat.completions.create({
        messages: [
            {role: "system", content: systemContext},
            {role: "user", content: prompt},
        ],
        model: '',
    });

    for (const choice of result.choices) {
        console.log(choice.message);
    }

    return result.choices[0].message;
}

function reformatSystemPrompt(userTone: string, request: string): string {
    // Customize the considerate prompt based on user tone and base request
    // You can add more logic here as needed
    const prompt = `
        You are a customer service rep at a shipping company.        
        Considering that your customer is feeling` +  userTone + `, ` +
        `Answer the question below by being efficiently short and asking the user if they need more clarity on specific points.  
        Recognize that the user is curious and engaging with him through his name Gerard. 
        --------
        ` + request +
        `------------       
        
        `;

    return prompt;
}