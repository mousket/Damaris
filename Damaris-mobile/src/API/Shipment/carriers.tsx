import fetch from 'node-fetch';
import fetchPitneyBowesBearerToken from "../bearerTokenRequest";


async function getCarriers(): Promise<void> {
    try {
        const bearerToken = await fetchPitneyBowesBearerToken(); // Assuming fetchPitneyBowesBearerToken returns a promise

        const authorization = `Bearer ${bearerToken}`;
        const resp = await fetch(
            'https://api-sandbox.sendpro360.pitneybowes.com/shipping/api/v1/carriers',
            {
                method: 'GET',
                headers: {
                    'X-PB-Developer-Partner-ID': '',
                    Authorization: authorization,
                },
            }
        );

        if (resp.ok) {
            const data = await resp.text();
            console.log(data); // Handle the retrieved carrier data as needed
        } else {
            console.error('Error fetching carriers:', resp.status, resp.statusText);
        }
    } catch (error) {
        console.error('An error occurred while fetching carriers:', error);
    }
}

// Example usage:
//getCarriers();
export default getCarriers;

