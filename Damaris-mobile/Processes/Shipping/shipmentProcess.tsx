class ShippingProcessItem {
    private originAddress: string = '';
    private destinationAddress: string = '';
    private shipmentItems: string[] = [];
    private preferredTimeOrSpeed: string = '';

    getOriginAddress(): string {
        // Logic for getting origin address (e.g., user input)
        return this.originAddress;
    }

    // Implement other stages (e.g., getDestinationAddress, getShipmentItems, etc.)
}

// Usage
const shippingItem = new ShippingProcessItem();
const originAddress = shippingItem.getOriginAddress();
