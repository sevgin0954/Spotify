export class Dictionary<TValue> {
    readonly kvp = {};

    add(key: string, value: TValue): void {
        if (this.kvp[key] == false) {
            this.kvp[key] = [];
        }

        this.kvp[key].push(value);
    }

    set(key: string, values: TValue[]): void {
        this.kvp[key] = values;
    };

    getValuesByKey(key: string): TValue[] {
        return this.kvp[key];
    }

    getKeys(): string[] {
        const keys = Object.keys(this.kvp);

        return keys;
    }
}