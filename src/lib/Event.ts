export class Event<T> {
    readonly data: T;

    constructor(data: T) {
        this.data = data;
    }
}
