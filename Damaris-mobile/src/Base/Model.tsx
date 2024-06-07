class Model {
    name: string;
    prompt!: Prompt<any>;
    constructor(name: string) {
        this.name = name;
    }
}