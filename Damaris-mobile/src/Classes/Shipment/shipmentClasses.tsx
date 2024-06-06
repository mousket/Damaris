class Carrier {
    constructor(
        public carrierID: string,
        public name: string,
        public originCountry: string,
        public properties: {
            internationalSupported: boolean;
            futureShipmentSupported: boolean;
            domesticNotSupported: boolean;
        }
    ) {}
}

class Country {
    constructor(
        public countryCode: string,
        public countryName: string
    ) {}
}

class ShipmentService {
    constructor(
        public serviceId: string,
        public brandedName: string
    ) {}
}

class CarrierAccounts {
    constructor(
        public carrierAccountId: string,
        public carrierName: string,
        public description: string
    ) {}
}

class ParcelType {
    constructor(
        public brandedName: string,
        public carrier: string,
        public groupName: string,
        public brandedDimensions: Record<string, unknown>,
        public parcelId: string,
        public isBranded: boolean,
        public parcelType: string,
        public serviceId: string,
        public weightRules: {
            maxWeight: number;
            minWeight: number;
            required: boolean;
            unitOfMeasurement: string;
        }[]
    ) {}
}
/* example of parcelType
const box1092: ParcelType = new ParcelType(
    "Box 1092",
    "usps",
    "Specialty Boxes and Envelopes",
    {},
    "B1092",
    true,
    "LP",
    "PM",
    [
        {
            maxWeight: 1120,
            minWeight: 0.01,
            required: true,
            unitOfMeasurement: "OZ",
        },
    ]
);
*/