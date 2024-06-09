const rateRequest = {
    "dateOfShipment": "2023-07-12",
    "fromAddress": {
        "addressLine1": "27 Watervw Dr",
        "addressLine2": "near abc street",
        "addressLine3": "near xyz street",
        "cityTown": "Beals",
        "company": "ABC Company",
        "countryCode": "US",
        "email": "sender@email.com",
        "name": "Sasha Sekrotov",
        "phone": "323 555-1212",
        "postalCode": "04611-3214",
        "stateProvince": "ME",
        "residential": false
    },
    "parcel": {
        "height": 1,
        "length": 2,
        "width": 1,
        "dimUnit": "IN",
        "weightUnit": "OZ",
        "weight": 1
    },
    "carrierAccounts": [
        "jg5Z5pgl29A"
    ],

    "toAddress": {
        "addressLine1": "27 Watervw Dr",
        "addressLine2": "near abc street",
        "addressLine3": "near xyz street",
        "cityTown": "Westford",
        "company": "Pitney Bowes Inc.",
        "countryCode": "US",
        "email": "receiver@email.com",
        "name": "sender_fname",
        "phone": "2032032033",
        "postalCode": "01886-6502",
        "residential": true,
        "stateProvince": "MA"
    },
    "isHazmat": false
};


    const rateRequest1: RateRequest = {
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
        height: "IMPORTANT",
        length: "IMPORTANT",
        width: "IMPORTANT",
        dimUnit: "IMPORTANT",
        weightUnit: "IMPORTANT",
        weight: 100000,
    },
    carrierAccounts: ["jg5Z5pgl29A"],
    parcelType: "MED_EXP_BOX",
    parcelId: "MED_EXP_BOX",
    serviceId: "",//"NDA_AM",
    toAddress: {
        addressLine1: "IMPORTANT",
        addressLine2: "*",
        addressLine3: "*",
        cityTown: "IMPORTANT",
        company: "Pitney Bowes Inc.",
        countryCode: "US",
        email: "receiver@email.com",
        name: "sender_fname",
        phone: "2032032033",
        postalCode: "IMPORTANT",
        residential: true,
        stateProvince: "IMPORTANT",
    },
};