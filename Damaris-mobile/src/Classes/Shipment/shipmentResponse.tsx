class ShipmentResponse {
    correlationId: string;
    labelLayout: LabelLayout[];
    fromAddress: Address;
    parcel: {
        length: number;
        height: number;
        width: number;
        dimUnit: string;
        weightUnit: string;
        weight: number;
    };
    rate: {
        baseCharge: number;
        carrier: string;
        currencyCode: string;
        parcelType: string;
        rateTypeId: string;
        serviceId: string;
        surcharges: {
            fee: number;
            name: string;
        }[];
        totalCarrierCharge: number;
    };
    toAddress: Address;
    parcelTrackingNumber: string;
    shipmentId: string;
    shipmentOptions: ShipmentOptions;

    constructor(
        correlationId: string,
        labelLayout: any[],
        fromAddress: any,
        parcel: any,
        rate: any,
        toAddress: any,
        parcelTrackingNumber: string,
        shipmentId: string,
        shipmentOptions: any
    ) {
        this.correlationId = correlationId;
        this.labelLayout = labelLayout;
        this.fromAddress = fromAddress;
        this.parcel = parcel;
        this.rate = rate;
        this.toAddress = toAddress;
        this.parcelTrackingNumber = parcelTrackingNumber;
        this.shipmentId = shipmentId;
        this.shipmentOptions = shipmentOptions;
    }
}


/*
// Example usage:
const shipmentResponse: ShipmentResponse = new ShipmentResponse(
    "edd999aac9ce4ab1994eccea60832759",
    [
        {
            contentType: "URL",
            contents: "https://stg-labels.gcs.pitneybowes.com/edd999aac9ce4ab1994eccea60832759.pdf",
            fileFormat: "PDF",
            size: "DOC_4X6",
            type: "SHIPPING_LABEL",
        },
    ],
    {
        // Fill in the fromAddress data here...
    },
    {
        // Fill in the parcel data here...
    },
    {
        // Fill in the rate data here...
    },
    {
        // Fill in the toAddress data here...
    },
    "794637107508",
    "FEDEX2200537622978393",
    {
        printDepartment: "department",
        printInvoiceNumber: "invoicenumber",
        printPONumber: "ponumber",
        printCustomMessage1: "Print Message 1",
    }
);

console.log(shipmentRequest);
*/