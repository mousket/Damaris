class DeliveryCommitment {
    constructor(
        public additionalDetails: string,
        public estimatedDeliveryDateTime: string,
        public guarantee: string
    ) {}
}

class Surcharge {
    constructor(
        public fee: number,
        public name: string
    ) {}
}

class Rate {
    constructor(
        public baseCharge: number,
        public carrier: string,
        public carrierAccount: string,
        public currencyCode: string,
        public deliveryCommitment: DeliveryCommitment,
        public parcelType: string,
        public parcelId: string,
        public rateTypeId: string,
        public serviceId: string,
        public surcharges: Surcharge[],
        public totalCarrierCharge: number,
        public isHazmat: boolean
    ) {}
}


/*
// Example usage:
const rateData = {
    rates: [
        {
            baseCharge: 90.24,
            carrier: "fedex",
            carrierAccount: "jg5Z5pgl29A",
            currencyCode: "USD",
            deliveryCommitment: {
                additionalDetails: "By 09:00 of FRI",
                estimatedDeliveryDateTime: "2024-06-07 09:00:00",
                guarantee: "FULL",
            },
            parcelType: "MED_EXP_BOX",
            parcelId: "MED_EXP_BOX",
            rateTypeId: "COMMERCIAL",
            serviceId: "NDA_AM",
            surcharges: [
                { fee: 6.15, name: "RESIDENTIAL_DELIVERY" },
                { fee: 4.82, name: "FUEL" },
            ],
            totalCarrierCharge: 101.21,
            isHazmat: false,
        },
    ],
};

const rate = new Rate(
    rateData.rates[0].baseCharge,
    rateData.rates[0].carrier,
    rateData.rates[0].carrierAccount,
    rateData.rates[0].currencyCode,
    new DeliveryCommitment(
        rateData.rates[0].deliveryCommitment.additionalDetails,
        rateData.rates[0].deliveryCommitment.estimatedDeliveryDateTime,
        rateData.rates[0].deliveryCommitment.guarantee
    ),
    rateData.rates[0].parcelType,
    rateData.rates[0].parcelId,
    rateData.rates[0].rateTypeId,
    rateData.rates[0].serviceId,
    rateData.rates[0].surcharges.map(s => new Surcharge(s.fee, s.name)),
    rateData.rates[0].totalCarrierCharge,
    rateData.rates[0].isHazmat
);

console.log(rate);

*/