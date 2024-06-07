import fetch from 'node-fetch';

async function getSpecialServices(
    service: string,
    parcel: string,
    carrier: string,
    originCountryCode: string,
    destinationCountryCode: string
): Promise<any> {
    try {
        const query = new URLSearchParams({
            service,
            parcel,
            carrier,
            originCountryCode,
            destinationCountryCode,
        }).toString();

        const resp = await fetch(
            `https://api-sandbox.sendpro360.pitneybowes.com/shipping/api/v1/specialServices?${query}`,
            {
                method: 'GET',
                headers: {
                    'X-PB-Developer-Partner-ID': 'us',
                    Authorization: 'Bearer <YOUR_TOKEN_HERE>',
                },
            }
        );

        if (resp.ok) {
            const data = await resp.text();
            return data; // Modify this to process the special service data as needed
        } else {
            console.error('Error fetching special services:', resp.status, resp.statusText);
            return null; // Handle the error case appropriately
        }
    } catch (error) {
        console.error('An error occurred while fetching special services:', error);
        return null; // Handle the error case appropriately
    }
}

export default getSpecialServices;
/*
// Example usage:
const specialServiceData = await getSpecialServices('string', 'string', 'fedex', 'US', 'US');
console.log(specialServiceData); // Modify this to process the special service data as needed
*/