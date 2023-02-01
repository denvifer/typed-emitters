import { EventEmitter } from "../lib/EventEmitter";

describe("EventEmitter", () => {
    const emitter = new EventEmitter<number>();

    const listener = jest.fn();
    emitter.addListener(listener);

    const eventData = 1;
    it("calls a listener", () => {
        emitter.emit(eventData);
        expect(listener).toBeCalledWith(eventData);
    });
});
