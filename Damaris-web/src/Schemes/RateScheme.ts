import RateRequest from "@/Interfaces/Shipment/RateRequest";
import Scheme from "@/Schemes/Scheme";
import Input from "@/Base/Input";
import Model from "@/Base/Model";

// Scheme to configure the rate model
export default class RateScheme extends Scheme<RateRequest> {

    constructor(rate: RateRequest) {
        super(rate);
        this.configure();
    }

    /**
 * Configures the RateScheme class by adding models for date of shipment and toAddress.
 * The toAddress model is a chain of prompts for different address fields.
 */
configure(): void {
    // Create a model for date of shipment
    const dateModel = new Model("dateOfShipment", "What is the date of shipment?");
    dateModel.prompt = new Input<string>(
        "DateTime",
        "When will you ship your parcel?",
        this.item.dateOfShipment,
        (value: string) => {
            this.item.dateOfShipment = value;
        }
    );
    // Add the date model to the models array
    this.models.push(dateModel);

    // Create a model for the toAddress
    const rateModel = new Model("toAddress", "What is the destination address?");
    rateModel.prompt = new Input<string>(
        "addressLine1",
        "A prompt to ask for the address line 1",
        this.item.fromAddress!.addressLine1,
        (value: string) => {
            this.item.fromAddress!.addressLine1 = value;
        }
    );

    // Set up the chain of prompts for the toAddress
    let currentNode = rateModel.prompt;

    currentNode.setNextPrompt(
        new Input<string>(
            "cityTown",
            "What is the city",
            this.item.fromAddress.cityTown,
            (value: string) => {
                this.item.fromAddress.cityTown = value;
            }
        )
    );

    currentNode = currentNode.getNextPrompt()!;

    currentNode.setNextPrompt(
        new Input<string>(
            "company",
            "what is the company",
            this.item.fromAddress.company,
            (value: string) => {
                this.item.fromAddress.company = value;
            }
        )
    );

    currentNode = currentNode.getNextPrompt()!;

    currentNode.setNextPrompt(
        new Input<string>(
            "email",
            "what is the receiver's email",
            this.item.fromAddress.email,
            (value: string) => {
                this.item.fromAddress.email = value;
            }
        )
    );

    currentNode = currentNode.getNextPrompt()!;

    currentNode.setNextPrompt(
        new Input<string>(
            "name",
            "What is the receiver name",
            this.item.fromAddress.name,
            (value: string) => {
                this.item.fromAddress.name = value;
            }
        )
    );

    currentNode = currentNode.getNextPrompt()!;

    currentNode.setNextPrompt(
        new Input<string>(
            "phone",
            "What is the receiver phone number",
            this.item.fromAddress.phone,
            (value: string) => {
                this.item.fromAddress.phone = value;
            }
        )
    );

    currentNode = currentNode.getNextPrompt()!;

    currentNode.setNextPrompt(
        new Input<string>(
            "postalCode",
            "what is the postal code",
            this.item.fromAddress.phone,
            (value: string) => {
                this.item.fromAddress.phone = value;
            }
        )
    );

    currentNode = currentNode.getNextPrompt()!;

    currentNode.setNextPrompt(
        new Input<string>(
            "statProvince",
            "what is the state",
            this.item.fromAddress.phone,
            (value: string) => {
                this.item.fromAddress.phone = value;
            }
        )
    );

    currentNode = currentNode.getNextPrompt()!;

    currentNode.setNextPrompt(
        new Input<string>(
            "residential",
            "what is the residential address",
            this.item.fromAddress.phone,
            (value: string) => {
                this.item.fromAddress.phone = value;
            }
        )
    );

    // Add the toAddress model to the models array
    this.models.push(rateModel);
}
}