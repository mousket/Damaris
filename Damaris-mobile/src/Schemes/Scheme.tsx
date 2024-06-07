class Scheme<T> {
    models: Model[] = [];
    
    constructor(protected item: T) {}

    public getItem() : T {
        return this.item;
    }

    process () {
        this.models.forEach(model => {
            let currentPrompt = model.prompt;
            while (!!currentPrompt) {
                // Process each input
                currentPrompt = currentPrompt.getNextPrompt()!;
            }
        });
    }
}