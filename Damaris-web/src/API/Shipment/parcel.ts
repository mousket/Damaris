import fetchPitneyBowesBearerToken from "../bearerTokenRequest";

async function getParcelTypes(
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
			`https://api-sandbox.sendpro360.pitneybowes.com/shipping/api/v1/parcelTypes?${query}`,
			{
				method: "GET",
				headers: {
					"X-PB-Developer-Partner-ID": "",
					Authorization: authorization,
				},
			}
		);

		if (resp.ok) {
			const data = await resp.text();
			return data; // Modify this to process the parcel type data as needed
		} else {
			console.error(
				"Error fetching parcel types:",
				resp.status,
				resp.statusText
			);
			return null; // Handle the error case appropriately
		}
	} catch (error) {
		console.error("An error occurred while fetching parcel types:", error);
		return null; // Handle the error case appropriately
	}
}

export default getParcelTypes;
/*
// Example usage:
const parcelTypeData = await getParcelTypes('fedex', 'US', 'US');
console.log(parcelTypeData); // Modify this to process the parcel type data as needed
*/
