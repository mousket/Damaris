
import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

const apiKey = import.meta.env.VITE_TEXT_ANALYTICS_API_KEY || "";
const endpoint = import.meta.env.VITE_TEXT_ANALYTICS_ENDPOINT || "";
const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

export async function customEntityExtraction(text: string) {

    const results = await client.recognizeEntities([text]);

    let resultList: Record<string, string>[] = [];
    console.log("results", results);
    for (const result of results) {
        console.log(`- Document ${result.id}`);
        if (!result.error) {
            console.log("\tRecognized Entities:");
            for (const entity of result.entities) {
                //console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
                const newList = processEntity(entity);
                const mergedList = MergeTwoLists(resultList, newList);
                resultList = mergedList;
            }
        } else console.error("\tError:", result.error);
    }

    return new Promise<Record<string, string>[]>((resolve, reject) => {
        if(resultList.length > 0) {
            resolve(resultList);
        }
        else reject([])
    })
}

export default customEntityExtraction;


interface Entity {
    category: string;
    text: string;
}

function processEntity(entity: Entity): Record<string, string>[] {
    if (entity.category === 'Address') {
        const result: Record<string, string>[] = [];

        // Split the address components
        const [streetAddress, city, state, zipCode] = entity.text.split(', ');

        // Add components to the result
        if (streetAddress) {
            result.push({ addressLine1: streetAddress });
        }
        if (city) {
            result.push({ cityTown: city });
        }
        if (state) {
            result.push({ stateProvince: state });
        }
        if (zipCode) {
            result.push({ postalCode: zipCode });
        }

        return result;

        return result;
    } else if (entity.category === 'Quantity') {
        // Check for zip code format
        if (/^\d{5}(-\d{4})?$/.test(entity.text)) {
            return [{ postalCode: entity.text }];
        }

        // Check for inches
        if (entity.text.includes('inches')) {
            return [{ dimUnit: 'IN', dimValue: entity.text }];
        }

        // Check for pounds
        if (entity.text.includes('lb') || entity.text.includes('pound')) {
            return [{ weightUnit: 'LB', weight: entity.text.replace('pound', '').trim() }];
        }

        // Check for ounces
        if (entity.text.includes('oz')) {
            return [{ weightUnit: 'OZ', weight: entity.text.replace('oz', '').trim() }];
        }
    } else if (entity.category === 'Email') {
        return [{ email: entity.text }];
    }

    return [];
}


function MergeTwoLists<T>(list1: T[], list2: T[]): T[] {
    // Using the concat method
    // const combinedList = list1.concat(list2);

    // Using the spread operator
    const combinedList = [...list1, ...list2];

    return combinedList;
}