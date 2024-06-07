
class ShipmentRequest {
    size: string;
    type: string;
    format: string;
    dateOfShipment: string;
    fromAddress: Address;
    toAddress: Address;
    parcel: Parcel;
    carrierAccountId: string = "jg5Z5pgl29A";
    parcelType: string;
    parcelId: string;
    serviceId: string;
    specialServices: any[];
    shipmentOptions: ShipmentOptions;
    metadata: {
        name: string;
        value: string;
    }[];

    constructor(
        size: string,
        type: string,
        format: string,
        dateOfShipment: string,
        fromAddress: any,
        parcel: any,
        carrierAccountId: string,
        parcelType: string,
        parcelId: string,
        serviceId: string,
        specialServices: any[],
        shipmentOptions: any,
        metadata: any[],
        toAddress: any
    ) {
        this.size = size;
        this.type = type;
        this.format = format;
        this.dateOfShipment = dateOfShipment;
        this.fromAddress = fromAddress;
        this.parcel = parcel;
        this.carrierAccountId = carrierAccountId;
        this.parcelType = parcelType;
        this.parcelId = parcelId;
        this.serviceId = serviceId;
        this.specialServices = specialServices;
        this.shipmentOptions = shipmentOptions;
        this.metadata = metadata;
        this.toAddress = toAddress;
    }
}

// Example usage:
const shipmentRequest: ShipmentRequest = new ShipmentRequest(
    "DOC_4X6",
    "SHIPPING_LABEL",
    "PDF",
    "2023-05-25",
    {
        // Fill in the fromAddress data here...
    },
    {
        // Fill in the parcel data here...
    },
    "jg5Z5pgl29A",
    "MED_EXP_BOX",
    "MED_EXP_BOX",
    "NDA_AM",
    [],
    {
        // Fill in the shipmentOptions data here...
    },
    [
        {
            name: "costAccountName",
            value: "cost account 123",
        },
    ],
    {
        // Fill in the toAddress data here...
    }
);

console.log(shipmentRequest);
