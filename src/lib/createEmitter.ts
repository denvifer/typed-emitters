import { removeFromArray } from "./utils/removeFromArray";

export const createEmitter = <Args extends Array<unknown>>() => {
    const listeners = new Array<(...args: Args) => void>();

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

    return {
        addListener,
        removeListener,
        hasListeners,
        emit,
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
