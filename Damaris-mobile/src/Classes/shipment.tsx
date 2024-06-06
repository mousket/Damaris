enum ShippingDocumentType {
    ShippingLabel =   "SHIPPING_LABEL",
    QrCode= "QR_CODE",
    Manifest= "MANIFEST"
}

class Address{
    addressLine1: string = "";
    addressLine2: string= "";
    addressLine3: string= "";
    cityTown: string= "";
    company: string= "";
    countryCode: string= "";
    email: string= "";
    name: string= "";
    phone: string= "";
    postalCode: string= "";
    residential: boolean= false;
    stateProvince: string= "";
}

class Parcel {
    height: number = 0;
    length: number = 0;
    width: number = 0;
    dimUnit: string="";
    weightUnit: string ="";
    weight: number = 0;
}


class Weight {
    unitOfMeasurement: string = '';
    weight: number = 0;
}

class ShipmentDocument {
    size: string = '';
    printDialogOption: string = '';
    type: string = '';
    contentType: string = '';
    fileFormat: string = '';
}

class ShipmentOptions {
    addToManifest: boolean;
    printCustomMessage: string;
    receiptOption: string;
    printDepartment: string;
    printInvoiceNumber: string;
    printPONumber: string;
    packageDescription: string;

    constructor(
        addToManifest: boolean,
        printCustomMessage: string,
        receiptOption: string,
        printDepartment: string,
        printInvoiceNumber: string,
        printPONumber: string,
        packageDescription: string
    ) {
        this.addToManifest = addToManifest;
        this.printCustomMessage = printCustomMessage;
        this.receiptOption = receiptOption;
        this.printDepartment = printDepartment;
        this.printInvoiceNumber = printInvoiceNumber;
        this.printPONumber = printPONumber;
        this.packageDescription = packageDescription;
    }
}

class InputParameter {
    name: string = '';
    value: string = '';
}

class SpecialService {
    specialServiceId: string = '';
    inputParameters: InputParameter[] = [];
}

class LabelLayout {
    contentType: string;
    contents: string;
    fileFormat: string;
    size: string;
    type: string;

    constructor(
        contentType: string,
        contents: string,
        fileFormat: string,
        size: string,
        type: string
    ) {
        this.contentType = contentType;
        this.contents = contents;
        this.fileFormat = fileFormat;
        this.size = size;
        this.type = type;
    }
}


/*
class ShipmentRequest {
    fromAddress: Address = new Address();
    toAddress: Address = new Address();
    parcel: { weight: Weight } = { weight: new Weight() };
    rates: Rate[] = [];
    documents: ShipmentDocument[] = [];
    shipmentOptions: ShipmentOptions[] = [];
}
*/


/*
// Example usage:
const shipmentRequest: ShipmentRequest = {
};

console.log(shipmentRequest.fromAddress.name); // Example: "Kathryn Smith"
*/

