import { removeFromArray } from "./utils/removeFromArray";

export const createEmitter = <Args extends Array<unknown>>() => {
    let listeners = new Array<(...args: Args) => void>();

    const removeListener = (listener: (...args: Args) => void): void => {
        removeFromArray(listeners, listener);
    };

    const addListener = (listener: (...args: Args) => void): (() => void) => {
        listeners.push(listener);
        return () => {
            removeListener(listener);
        };
    };

    const hasListeners = () => !!listeners.length;

    const emit = (...args: Args) => {
        listeners.forEach((listener) => {
            listener(...args);
        });
    };

    const removeAllListeners = () => {
        listeners = [];
    };

    return {
        addListener,
        removeListener,
        hasListeners,
        emit,
        removeAllListeners,
        get publicInterface() {
            return {
                addListener,
                removeListener,
            };
        },
    };
};

export type EmitterInterface<Args extends Array<unknown>> = ReturnType<
    typeof createEmitter<Args>
>;

export type EventInterface<Args extends Array<unknown>> = ReturnType<
    typeof createEmitter<Args>
>["publicInterface"];
