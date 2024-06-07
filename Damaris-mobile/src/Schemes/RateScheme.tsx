class RateScheme extends Scheme<ShipmentRequest> {

    constructor(shipment: ShipmentRequest) {
        super(shipment);
        this.configure();
    }

    configure(): void {
        let address = new Model("toAddress");
        address.prompt = new Input(
            "addressLine1",
            "A prompt to ask for the address line 1",
            this.item.fromAddress.addressLines.join(","),
            (value: string) => {
                this.item.fromAddress.addressLines = value.split(",").map(line => line.trim());
        })

        let currentNode = address.prompt

        currentNode.setNextPrompt(
            new Input(
                "cityTown",
                "A prompt to ask for city or town",
                this.item.fromAddress.cityTown,
                (value: string) => {
                    this.item.fromAddress.cityTown = value;
            }))

        currentNode = currentNode.getNextPrompt()!;

        currentNode.setNextPrompt(
            new Input(
                "company",
                "A prompt to ask for the company",
                this.item.fromAddress.company,
                (value: string) => {
                    this.item.fromAddress.company = value;
            }))

        currentNode = currentNode.getNextPrompt()!;

        currentNode.setNextPrompt(
            new Input(
                "email",
                "A prompt to ask for the user's email",
                this.item.fromAddress.email,
                (value: string) => {
                    this.item.fromAddress.email = value;
            }))

        this.models.push(address)
    }
}