import { EventEmitter } from "../lib/EventEmitter";
import { Event } from "../lib/Event";

describe("EventEmitter", () => {
    const eventEmitter = new EventEmitter<number>();

    const listener = jest.fn();
    eventEmitter.addListener(listener);

    const eventData = 1;
    it("calls a listener", () => {
        eventEmitter.emit(eventData);
        expect(listener).toBeCalledWith(new Event(eventData));
    });
});
