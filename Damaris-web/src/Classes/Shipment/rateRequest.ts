
class RateRequest {
    parcel: {
        length: number;
        width: number;
        dimUnit: string;
        weight: number;
        height: number;
        weightUnit: string;
    };
    parcelType: string;
    fromAddress: {
        residential: boolean;
        phone: string;
        countryCode: string;
        postalCode: string;
        cityTown: string;
        name: string;
        addressLine1: string;
        stateProvince: string;
        addressLine2: string;
        company: string;
        addressLine3: string;
        email: string;
    };
    dateOfShipment: string;
    serviceId: string;
    toAddress: {
        residential: boolean;
        phone: string;
        countryCode: string;
        postalCode: string;
        cityTown: string;
        name: string;
        addressLine1: string;
        stateProvince: string;
        addressLine2: string;
        company: string;
        addressLine3: string;
        email: string;
    };
    carrierAccounts: string[];
    parcelId: string;

    constructor(
        parcel: any,
        parcelType: string,
        fromAddress: any,
        dateOfShipment: string,
        serviceId: string,
        toAddress: any,
        carrierAccounts: string[],
        parcelId: string
    ) {
        this.parcel = parcel;
        this.parcelType = parcelType;
        this.fromAddress = fromAddress;
        this.dateOfShipment = dateOfShipment;
        this.serviceId = serviceId;
        this.toAddress = toAddress;
        this.carrierAccounts = carrierAccounts;
        this.parcelId = parcelId;
    }
}
