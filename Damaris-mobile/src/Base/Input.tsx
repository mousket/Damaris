class Input extends Prompt<string> {
    constructor(name: string, hint: string, value?: string, private mapper? : (value: string) => void) {
        super(name, hint, value);
        if(!!mapper)
            mapper(value!);
    }

    setValue(value: string) {
        this.value = value;
        if(!!this.mapper)
            this.mapper(value);
    }
}