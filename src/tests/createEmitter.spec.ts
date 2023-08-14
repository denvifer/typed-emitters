import { createEmitter, EmitterInterface } from "../lib/createEmitter";

describe(createEmitter.name, () => {
    let emitter: EmitterInterface<[string, number]>;

    beforeEach(() => {
        emitter = createEmitter();
    });

    test("hasListeners returns false if there are no listeners", () => {
        expect(emitter.hasListeners()).toEqual(false);
    });

    test("hasListeners returns true after adding a listener", () => {
        emitter.addListener(jest.fn());
        expect(emitter.hasListeners()).toEqual(true);
    });

    test("hasListeners returns false after removing a listener", () => {
        const listener = jest.fn();
        emitter.addListener(listener);
        emitter.removeListener(listener);

        expect(emitter.hasListeners()).toEqual(false);
    });

    test("calls a listener with right args", () => {
        const listener = jest.fn();
        emitter.addListener(listener);

        const args: [string, number] = ["test", 1];
        emitter.emit(...args);

        expect(listener).toBeCalledWith(...args);
    });

    test("publicInterface works correctly", () => {
        const listener = jest.fn();

        emitter.publicInterface.addListener(listener);
        expect(emitter.hasListeners()).toEqual(true);

        emitter.publicInterface.removeListener(listener);
        expect(emitter.hasListeners()).toEqual(false);
    });

    test("removes all listeners", () => {
        emitter.addListener(jest.fn());
        emitter.removeAllListeners();
        expect(emitter.hasListeners()).toEqual(false);
    });

    test("doesn't add duplicated listeners", () => {
        const listener = jest.fn();

        emitter.addListener(listener);
        emitter.addListener(listener);

        emitter.emit("test", 1);

        expect(listener).toBeCalledTimes(1);
    });
});
