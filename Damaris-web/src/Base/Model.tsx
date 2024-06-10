import Prompt from "./Prompt";

export default class Model {
    prompt!: Prompt<unknown>;
    constructor(public name: string, public hint: string) {
    }
}