class Input<T> extends Prompt<T> {
    constructor(name: string, hint: string, value?: T, private mapper? : (value: T) => void) {
        super(name, hint, value);
        if(!!mapper)
            mapper(value!);
    }

    setValue(value: T) {
        this.value = value;
        if(!!this.mapper)
            this.mapper(value);
    }
}