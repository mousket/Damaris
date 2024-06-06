import fetch from 'node-fetch';
import fetchPitneyBowesBearerToken from "../bearerTokenRequest";

//Parameters ShipmentRequest
//Returns a ShipmentResponse
async function shipmenRequest(request: ShipmentRequest): Promise<void> {
    const bearerToken = await fetchPitneyBowesBearerToken(); // Assuming fetchPitneyBowesBearerToken returns a promise
    const authorization = `Bearer ${bearerToken}`;


    const resp = await fetch(
        `https://api-sandbox.sendpro360.pitneybowes.com/shipping/api/v1/shipments`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-PB-Developer-Partner-ID': '',
                Authorization: authorization
            },
            body: JSON.stringify(request)
        }
    );

    const data = await resp.json();
    console.log(data);
}
