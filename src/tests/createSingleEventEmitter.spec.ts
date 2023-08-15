import {
    createSingleEventEmitter,
    SingleEventEmitter,
} from "../lib/createSingleEventEmitter";

describe(createSingleEventEmitter.name, () => {
    let emitter: SingleEventEmitter<[string, number]>;

    beforeEach(() => {
        emitter = createSingleEventEmitter();
    });

    test("hasListeners returns false if there are no listeners", () => {
        expect(emitter.hasListeners()).toBeFalsy();
    });

    test("hasListeners returns true after adding a listener", () => {
        emitter.addListener(jest.fn());
        expect(emitter.hasListeners()).toBeTruthy();
    });

    test("hasListeners returns false after removing a listener", () => {
        const listener = jest.fn();
        emitter.addListener(listener);
        emitter.removeListener(listener);

        expect(emitter.hasListeners()).toBeFalsy();
    });

    test("calls a listener with right args", () => {
        const listener = jest.fn();
        emitter.addListener(listener);

        const args: [string, number] = ["test", 1];
        emitter.emit(...args);

        expect(listener).toBeCalledWith(...args);
    });

    test("source works correctly", () => {
        const listener = jest.fn();

        emitter.source.addListener(listener);
        expect(emitter.hasListeners()).toBeTruthy();

        emitter.source.removeListener(listener);
        expect(emitter.hasListeners()).toBeFalsy();
    });

    test("removes all listeners", () => {
        emitter.addListener(jest.fn());
        emitter.removeAllListeners();
        expect(emitter.hasListeners()).toBeFalsy();
    });

    test("doesn't add duplicated listeners", () => {
        const listener = jest.fn();

        emitter.addListener(listener);
        emitter.addListener(listener);

        emitter.emit("test", 1);

        expect(listener).toBeCalledTimes(1);
    });
});
