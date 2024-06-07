class Prompt<T> {
    name: string;
    hint: string;

    constructor(name: string, hint: string, protected value?: T, protected next?: Prompt<any>) {
        this.name = name;
        this.hint = hint;
    }
    
    getName() { return this.name; }
    getValue() { return this.value; }

    getNextPrompt() { return this.next }
    setNextPrompt(next: Prompt<any>) { this.next = next; }
}