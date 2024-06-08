class Scheme<T> {
    models: Model[] = [];
    
    constructor(protected item: T) {}

    public getItem() : T {
        return this.item;
    }

    /**
 * Process the models in the scheme.
 * This method iterates over each model in the scheme,
 * and for each model, it iterates over its prompts.
 * It processes each prompt until there are no more prompts.
 *
 * @returns {void}
 */
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