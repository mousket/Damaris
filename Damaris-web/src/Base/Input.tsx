import Prompt from "@/Base/Prompt";

export default class Input<T> extends Prompt<T> {
    constructor(name: string, hint: string, value?: T, private callback? : (value: T) => void) {
        super(name, hint, value);
        if(callback)
            callback(value!);
    }

    setValue(value: T) {
        this.value = value;
        if(this.callback)
            this.callback(value);
    }
}