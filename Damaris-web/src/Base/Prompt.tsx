export default class Prompt<T> {
    name: string;
    hint: string;
    isSet: boolean = false;
    protected next?: Prompt<any>;

    constructor(name: string, hint: string, protected value?: T, protected callback? : (value: T) => void) {
        this.name = name;
        this.hint = hint;
    }
    
    getName() { return this.name; }
    getValue() { return this.value; }

    getNextPrompt() { return this.next }
    setNextPrompt(next: Prompt<any>) { this.next = next; }

    setValue(value: T) : boolean {
        try {
            this.value = value;
            if(this.callback)
                this.callback(value);
            this.isSet = true;
            return true;
        }
        catch(err) {
            return false;
        }
    }
}