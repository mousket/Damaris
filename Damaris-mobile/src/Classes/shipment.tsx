class Address {
    company: string = '';
    name: string = '';
    phone: string = '';
    email: string = '';
    residential: boolean = false;
    addressLines: string[] = [];
    cityTown: string = '';
    stateProvince: string = '';
    postalCode: string = '';
    countryCode: string = '';
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
    name: string = '';
    value: string = '';
}

class InputParameter {
    name: string = '';
    value: string = '';
}

class SpecialService {
    specialServiceId: string = '';
    inputParameters: InputParameter[] = [];
}

class Rate {
    carrier: string = '';
    serviceId: string = '';
    parcelType: string = '';
    specialServices: SpecialService[] = [];
}

class ShipmentRequest {
    fromAddress: Address = new Address();
    toAddress: Address = new Address();
    parcel: { weight: Weight } = { weight: new Weight() };
    rates: Rate[] = [];
    documents: ShipmentDocument[] = [];
    shipmentOptions: ShipmentOptions[] = [];
}

/*
// Example usage:
const shipmentRequest: ShipmentRequest = {
};

console.log(shipmentRequest.fromAddress.name); // Example: "Kathryn Smith"
*/

