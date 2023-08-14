import {
    createMultiEmitter,
    MultiEmitterInterface,
} from "../lib/createMultiEmitter";

describe(createMultiEmitter.name, () => {
    let emitter: MultiEmitterInterface<{
        event1: [string, number];
        event2: [number, string];
    }>;

    beforeEach(() => {
        emitter = createMultiEmitter();
    });

    test("hasListeners returns false if there are no listeners", () => {
        expect(emitter.hasListeners("event1")).toEqual(false);
        expect(emitter.hasListeners("event2")).toEqual(false);
    });

    test("hasListeners returns true for the right eventName after adding a listener", () => {
        emitter.addListener("event1", jest.fn());
        expect(emitter.hasListeners("event1")).toEqual(true);
        expect(emitter.hasListeners("event2")).toEqual(false);
    });

    test("hasListeners returns false after removing a listener", () => {
        const listener = jest.fn();
        emitter.addListener("event1", listener);
        emitter.removeListener("event1", listener);

        expect(emitter.hasListeners("event1")).toEqual(false);
        expect(emitter.hasListeners("event2")).toEqual(false);
    });

    test("calls the right listener with right args", () => {
        const listener1 = jest.fn();
        const listener2 = jest.fn();

        emitter.addListener("event1", listener1);
        emitter.addListener("event2", listener2);

        const args: [string, number] = ["test", 1];
        emitter.emit("event1", ...args);

        expect(listener1).toBeCalledWith(...args);
        expect(listener2).not.toBeCalled();
    });

    test("publicInterface works correctly", () => {
        const listener = jest.fn();

        emitter.publicInterface.addListener("event1", listener);
        expect(emitter.hasListeners("event1")).toEqual(true);

        emitter.publicInterface.removeListener("event1", listener);
        expect(emitter.hasListeners("event1")).toEqual(false);
    });

    test("removes all listeners", () => {
        emitter.addListener("event1", jest.fn());
        emitter.addListener("event2", jest.fn());
        emitter.removeAllListeners();
        expect(emitter.hasListeners("event1")).toEqual(false);
        expect(emitter.hasListeners("event2")).toEqual(false);
    });

    test("removes all listeners for a specific eventName", () => {
        emitter.addListener("event1", jest.fn());
        emitter.addListener("event2", jest.fn());
        emitter.removeAllListeners("event1");
        expect(emitter.hasListeners("event1")).toEqual(false);
        expect(emitter.hasListeners("event2")).toEqual(true);
    });
});
