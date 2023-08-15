import {
    createMultiEventEmitter,
    MultiEventEmitter,
} from "../lib/createMultiEventEmitter";

describe(createMultiEventEmitter.name, () => {
    let emitter: MultiEventEmitter<{
        event1: [string, number];
        event2: [number, string];
    }>;

    beforeEach(() => {
        emitter = createMultiEventEmitter();
    });

    test("hasListeners returns false if there are no listeners", () => {
        expect(emitter.hasListeners("event1")).toBeFalsy();
        expect(emitter.hasListeners("event2")).toBeFalsy();
    });

    test("hasListeners returns true for the right eventName after adding a listener", () => {
        emitter.addListener("event1", jest.fn());
        expect(emitter.hasListeners("event1")).toBeTruthy();
        expect(emitter.hasListeners("event2")).toBeFalsy();
    });

    test("hasListeners returns false after removing a listener", () => {
        const listener = jest.fn();
        emitter.addListener("event1", listener);
        emitter.removeListener("event1", listener);

        expect(emitter.hasListeners("event1")).toBeFalsy();
        expect(emitter.hasListeners("event2")).toBeFalsy();
    });

    test("hasListeners method works correctly when eventName is not specified", () => {
        const listener = jest.fn();
        emitter.addListener("event1", listener);
        expect(emitter.hasListeners()).toBeTruthy();
        emitter.removeAllListeners();
        expect(emitter.hasListeners()).toBeFalsy();
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

    test("source works correctly", () => {
        const listener = jest.fn();

        emitter.source.addListener("event1", listener);
        expect(emitter.hasListeners("event1")).toBeTruthy();

        emitter.source.removeListener("event1", listener);
        expect(emitter.hasListeners("event1")).toBeFalsy();
    });

    test("removes all listeners", () => {
        emitter.addListener("event1", jest.fn());
        emitter.addListener("event2", jest.fn());
        emitter.removeAllListeners();
        expect(emitter.hasListeners("event1")).toBeFalsy();
        expect(emitter.hasListeners("event2")).toBeFalsy();
    });

    test("removes all listeners for a specific eventName", () => {
        emitter.addListener("event1", jest.fn());
        emitter.addListener("event2", jest.fn());
        emitter.removeAllListeners("event1");
        expect(emitter.hasListeners("event1")).toBeFalsy();
        expect(emitter.hasListeners("event2")).toBeTruthy();
    });

    test("doesn't add duplicated listeners", () => {
        const listener = jest.fn();

        emitter.addListener("event1", listener);
        emitter.addListener("event1", listener);

        emitter.emit("event1", "test", 1);

        expect(listener).toBeCalledTimes(1);
    });
});
