import fetchPitneyBowesBearerToken from "../bearerTokenRequest";

interface RateRequest {
	dateOfShipment: string;
	fromAddress: {
		addressLine1: string;
		addressLine2: string;
		addressLine3: string;
		cityTown: string;
		company: string;
		countryCode: string;
		email: string;
		name: string;
		phone: string;
		postalCode: string;
		stateProvince: string;
		residential: boolean;
	};
	parcel: {
		height: number;
		length: number;
		width: number;
		dimUnit: string;
		weightUnit: string;
		weight: number;
	};
	carrierAccounts: string[];
	parcelType: string;
	parcelId: string;
	serviceId: string;
	toAddress: {
		addressLine1: string;
		addressLine2: string;
		addressLine3: string;
		cityTown: string;
		company: string;
		countryCode: string;
		email: string;
		name: string;
		phone: string;
		postalCode: string;
		residential: boolean;
		stateProvince: string;
	};
}

//Take a RateRequest object and issues a list of rates

export async function getShipmentRate(rateRequest: RateRequest): Promise<any> {
	try {
		const bearerToken = await fetchPitneyBowesBearerToken(); // Assuming fetchPitneyBowesBearerToken returns a promise
		const authorization = `Bearer ${bearerToken}`;

		const resp = await fetch(
			`https://api-sandbox.sendpro360.pitneybowes.com/shipping/api/v1/rates`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-PB-Developer-Partner-ID": "",
					compactResponse: "true",
					Authorization: authorization,
				},
				body: JSON.stringify(rateRequest),
			}
		);

		if (resp.ok) {
			const data = await resp.json();
			return data; // Modify this to process the rate data as needed
		} else {
			console.error(
				"Error fetching shipment rates:",
				resp.status,
				resp.statusText
			);
			return null; // Handle the error case appropriately
		}
	} catch (error) {
		console.error("An error occurred while fetching shipment rates:", error);
		return null; // Handle the error case appropriately
	}
}

// Example usage:
const rateRequest: RateRequest = {
	dateOfShipment: "2023-07-12",
	fromAddress: {
		addressLine1: "27 Watervw Dr",
		addressLine2: "near abc street",
		addressLine3: "near xyz street",
		cityTown: "Beals",
		company: "ABC Company",
		countryCode: "US",
		email: "sender@email.com",
		name: "Sasha Sekrotov",
		phone: "323 555-1212",
		postalCode: "04611-3214",
		stateProvince: "ME",
		residential: false,
	},
	parcel: {
		height: 1,
		length: 1,
		width: 1,
		dimUnit: "",
		weightUnit: "",
		weight: 1,
	},
	carrierAccounts: ["jg5Z5pgl29A"],
	parcelType: "MED_EXP_BOX",
	parcelId: "MED_EXP_BOX",
	serviceId: "", //"NDA_AM",
	toAddress: {
		addressLine1: "",
		addressLine2: "*",
		addressLine3: "*",
		cityTown: "",
		company: "Pitney Bowes Inc.",
		countryCode: "US",
		email: "receiver@email.com",
		name: "sender_fname",
		phone: "2032032033",
		postalCode: "",
		residential: true,
		stateProvince: "",
	},
};

export type RateDetails = {
	baseCharge: number;
	carrier: string;
	carrierAccount: string;
	currencyCode: string;
	deliveryCommitment: {
		additionalDetails: string;
		estimatedDeliveryDateTime: string;
		guarantee: string;
	};
	parcelType: string;
	rateTypeId: string;
	serviceId: string;
	surcharges: {
		fee: number;
		name: string;
	}[];
	totalCarrierCharge: number;
	isHazmat: boolean;
};

export type RateResponse = {
	rates: RateDetails[];
};

// const shipmentRates = getShipmentRate(rateRequest);
// console.log(shipmentRates); // Modify this to process the rate data as needed
