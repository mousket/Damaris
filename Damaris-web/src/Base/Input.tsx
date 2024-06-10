import Prompt from "@/Base/Prompt";

export default class Input<T> extends Prompt<T> {
    constructor(name: string, hint: string, value?: T, callback? : (value: T) => void) {
        super(name, hint, value, callback);
        if(callback)
            callback(value!);
    }
}