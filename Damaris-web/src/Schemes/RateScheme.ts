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
    const dateModel = new Model("dateOfShipment", "Prompt for date of shipment");
    dateModel.prompt = new Input<string>(
        "dateOfShipment",
        "A prompt to ask for the date of shipment",
        this.item.dateOfShipment,
        (value: string) => {
            this.item.dateOfShipment = value;
        }
    );
    // Add the date model to the models array
    this.models.push(dateModel);

    // Create a model for the toAddress
    const rateModel = new Model("toAddress", "Prompt for the destination address");
    rateModel.prompt = new Input<string>(
        "addressLine1",
        "A prompt to ask for the rateModel line 1",
        this.item.fromAddress.addressLine1,
        (value: string) => {
            this.item.fromAddress.addressLine1 = value;
        }
    );

    // Set up the chain of prompts for the toAddress
    let currentNode = rateModel.prompt;

    currentNode.setNextPrompt(
        new Input<string>(
            "cityTown",
            "A prompt to ask for city or town",
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
            "A prompt to ask for the company",
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
            "A prompt to ask for the user's email",
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
            "A prompt to ask for the receiver name",
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
            "A prompt to ask for phone number",
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
            "A prompt to ask for the postal code",
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
            "A prompt to ask for the state",
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
            "A prompt to ask if it's a residential address",
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