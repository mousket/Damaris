import fetchPitneyBowesBearerToken from "../bearerTokenRequest";

async function getShippingServices(
	carrier: string,
	originCountryCode: string,
	destinationCountryCode: string
): Promise<any> {
	try {
		const bearerToken = await fetchPitneyBowesBearerToken(); // Assuming fetchPitneyBowesBearerToken returns a promise
		const authorization = `Bearer ${bearerToken}`;

		if (carrier == null || carrier == "") carrier = "fedex";
		if (originCountryCode == null || originCountryCode == "")
			originCountryCode = "us";
		if (destinationCountryCode == null || destinationCountryCode == "")
			destinationCountryCode = "us";

		const query = new URLSearchParams({
			carrier,
			originCountryCode,
			destinationCountryCode,
		}).toString();

		const resp = await fetch(
			`https://api-sandbox.sendpro360.pitneybowes.com/shipping/api/v1/services?${query}`,
			{
				method: "GET",
				headers: {
					"X-PB-Developer-Partner-ID": "",
					Authorization: authorization,
				},
			}
		);

		if (resp.ok) {
			const data = await resp.json();
			return data; // Modify this to return the relevant service object
		} else {
			console.error(
				"Error fetching shipping services:",
				resp.status,
				resp.statusText
			);
			return null; // Handle the error case appropriately
		}
	} catch (error) {
		console.error("An error occurred while fetching shipping services:", error);
		return null; // Handle the error case appropriately
	}
}

export default getShippingServices;

/*
// Example usage:
const serviceObject = await getShippingService('fedex', 'US', 'US');
console.log(serviceObject); // Modify this to process the service object as needed
*/
