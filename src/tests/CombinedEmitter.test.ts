import { CombinedEmitter } from "../lib/CombinedEmitter";

describe("CombinedEmitter", () => {
    enum Events {
        Type1,
        Type2,
    }

    type EventDataTypes = {
        [Events.Type1]: number;
        [Events.Type2]: string;
    };

    const emitter = new CombinedEmitter<EventDataTypes>();

    const listener = jest.fn();
    emitter.addListener(Events.Type1, listener);
    emitter.addListener(Events.Type2, listener);

    const event1Data = 1;
    it("calls a listener of the first event type", () => {
        emitter.emit(Events.Type1, event1Data);
        expect(listener).toBeCalledWith(event1Data);
    });

    const event2Data = "Test string";
    it("calls a listener of the second event type", () => {
        emitter.emit(Events.Type2, event2Data);
        expect(listener).toBeCalledWith(event2Data);
    });
});
