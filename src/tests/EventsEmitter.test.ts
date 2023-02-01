import { EventsEmitter } from "../lib/EventsEmitter";
import { Event } from "../lib/Event";

describe("EventsEmitter", () => {
    enum Events {
        Type1,
        Type2,
    }

    type EventDataTypes = {
        [Events.Type1]: number;
        [Events.Type2]: string;
    };

    const eventsEmitter = new EventsEmitter<EventDataTypes>();

    const listener = jest.fn();
    eventsEmitter.addListener(Events.Type1, listener);
    eventsEmitter.addListener(Events.Type2, listener);

    const event1Data = 1;
    it("calls a listener of the first event type", () => {
        eventsEmitter.emit(Events.Type1, event1Data);
        expect(listener).toBeCalledWith(new Event(event1Data));
    });

    const event2Data = "Test string";
    it("calls a listener of the second event type", () => {
        eventsEmitter.emit(Events.Type2, event2Data);
        expect(listener).toBeCalledWith(new Event(event2Data));
    });
});
