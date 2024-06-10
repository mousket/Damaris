export class RateRequest {
	//public company: string = "Pitney Bowes Inc.";
	//"company": "ABC Company",
	constructor(
		public dateOfShipment: string,
		public fromAddress: Address,
		public parcel: Parcel,
		public carrierAccounts: string[],
		public parcelType: string,
		public parcelId: string,
		public toAddress: Address
	) {}
	public isHazmat: boolean = false;
	public serviceId: string = "NDA_AM";
	singleRateMode(): void {
		this.fromAddress.company = "Pitney Bowes Inc.";
		if (this.serviceId == null || this.serviceId == "")
			this.serviceId = "NDA_AM";
	}

	shopRateMode(): void {
		this.fromAddress.company = "ABC Company";
		if (this.serviceId == null || this.serviceId == "") this.serviceId = "";
	}
}

// Example usage:
const rateRequest: RateRequest = new RateRequest(
	"2023-07-12",
	{
		addressLine1: "27 Watervw Dr",
		addressLine2: "near abc street",
		addressLine3: "near xyz street",
		cityTown: "Beals",
		company: "Pitney Bowes Inc.",
		countryCode: "US",
		email: "sender@email.com",
		name: "Sasha Sekrotov",
		phone: "323 555-1212",
		postalCode: "04611-3214",
		stateProvince: "ME",
		residential: false,
	},
	{
		height: 1,
		length: 2,
		width: 1,
		dimUnit: "IN",
		weightUnit: "OZ",
		weight: 1,
	},
	["jg5Z5pgl29A"],
	"MED_EXP_BOX",
	"MED_EXP_BOX",
	{
		addressLine1: "27 Watervw Dr",
		addressLine2: "near abc street",
		addressLine3: "near xyz street",
		cityTown: "Westford",
		company: "Pitney Bowes Inc.",
		countryCode: "US",
		email: "receiver@email.com",
		name: "sender_fname",
		phone: "2032032033",
		postalCode: "01886-6502",
		residential: true,
		stateProvince: "MA",
	}
);

console.log(rateRequest);
