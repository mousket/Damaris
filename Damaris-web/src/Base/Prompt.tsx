export default class Prompt<T> {
    name: string;
    hint: string;
    isSet: boolean = false;

    constructor(name: string, hint: string, protected value?: T, protected next?: Prompt<unknown>) {
        this.name = name;
        this.hint = hint;
    }
    
    getName() { return this.name; }
    getValue() { return this.value; }

    getNextPrompt() { return this.next }
    setNextPrompt(next: Prompt<unknown>) { this.next = next; }
}