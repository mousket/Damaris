//import { TextAnalysisClient, AzureKeyCredential, AnalyzeBatchAction } from '@azure/ai-language-text';

import {AnalyzeBatchAction} from "@azure/ai-language-text";

import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

const apiKey = import.meta.env.VITE_TEXT_ANALYTICS_API_KEY || ""; // Use environment variable
const endpoint = import.meta.env.VITE_TEXT_ANALYTICS_ENDPOINT || ""; // Use environment variable
const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

async function customEntityExtraction(text: string) {
    const customEntityExtractionDeploymentName = import.meta.env.VITE_CUSTOM_ENTITY_EXTRACTION_DEPLOYMENT_NAME || "";
    const customEntityExtractionProjectName = import.meta.env.VITE_CUSTOM_ENTITY_EXTRACTION_PROJECT_NAME || "";

    const actions = {
        recognizeCustomEntitiesActions: [
            {
                projectName: customEntityExtractionProjectName,
                deploymentName: customEntityExtractionDeploymentName
            }
        ],
    };

    const document = [text];

    const poller = await client.beginAnalyzeActions(document, actions, "en", {
        includeStatistics: true
    });
    const resultPages = await poller.pollUntilDone();

    for await (const page of resultPages) {
        const customEntitiesAction = page.recognizeCustomEntitiesResults[0];
        if (!customEntitiesAction.error) {
            for (const doc of customEntitiesAction.results) {
                console.log(`- Document ${doc.id}`);
                if (!doc.error) {
                    console.log("\tEntities:");
                    for (const entity of doc.entities) {
                        console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
                    }
                } else {
                    console.error("\tError:", doc.error);
                }
            }
            console.log("Action statistics: ");
            console.log(JSON.stringify(customEntitiesAction.results.statistics, null, 2));
        }
    }
}



async function batchTextAnalytics(text: string) {
    const actions: AnalyzeBatchAction[] = [
        {
            kind: "EntityRecognition",
            modelVersion: "latest",
        },
        {
            kind: "PiiEntityRecognition",
            modelVersion: "latest",
        },
        {
            kind: "KeyPhraseExtraction",
            modelVersion: "latest",
        },
    ];
    const poller = await client.beginAnalyzeBatch(actions, text, "en");
    const actionResults = await poller.pollUntilDone();
    for await (const actionResult of actionResults) {
        if (actionResult.error) {
            const { code, message } = actionResult.error;
            throw new Error(`Unexpected error (${code}): ${message}`);
        }
        switch (actionResult.kind) {
            case "KeyPhraseExtraction": {
                for (const doc of actionResult.results) {
                    console.log(`- Document ${doc.id}`);
                    if (!doc.error) {
                        console.log("\tKey phrases:");
                        for (const phrase of doc.keyPhrases) {
                            console.log(`\t- ${phrase}`);
                        }
                    } else {
                        console.error("\tError:", doc.error);
                    }
                }
                break;
            }
            case "EntityRecognition": {
                for (const doc of actionResult.results) {
                    console.log(`- Document ${doc.id}`);
                    if (!doc.error) {
                        console.log("\tEntities:");
                        for (const entity of doc.entities) {
                            console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
                        }
                    } else {
                        console.error("\tError:", doc.error);
                    }
                }
                break;
            }
            case "PiiEntityRecognition": {
                for (const doc of actionResult.results) {
                    console.log(`- Document ${doc.id}`);
                    if (!doc.error) {
                        console.log("\tPii Entities:");
                        for (const entity of doc.entities) {
                            console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
                        }
                    } else {
                        console.error("\tError:", doc.error);
                    }
                }
                break;
            }
            default: {
                throw new Error(`Unexpected action results: ${actionResult.kind}`);
            }
        }
    }
}

export default customEntityExtraction;