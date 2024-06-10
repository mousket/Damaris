import Prompt from "./Prompt";

export default class Model {
    prompt!: Prompt<any>;
    constructor(public name: string, public hint: string) {
    }

    setEntities(entities: Record<string, string>[]): void {
        let currentPrompt = this.prompt;

        while (currentPrompt) {
            entities.find(entity => {
                console.log("find", Object.keys(entity)[0], currentPrompt.name)
                if(Object.keys(entity)[0] === currentPrompt.name) {
                    currentPrompt.setValue(Object.values(entity)[0])
                }

            })

            currentPrompt = currentPrompt.getNextPrompt()!;
        }
    }
}