export const createEmitter = <Args extends Array<unknown>>() => {
    const listeners = new Set<(...args: Args) => void>();

    const removeListener = (listener: (...args: Args) => void): void => {
        listeners.delete(listener);
    };

    const addListener = (listener: (...args: Args) => void): (() => void) => {
        listeners.add(listener);
        return () => {
            removeListener(listener);
        };
    };

    const hasListeners = () => !!listeners.size;

    const emit = (...args: Args) => {
        listeners.forEach((listener) => {
            listener(...args);
        });
    };

    const removeAllListeners = () => {
        listeners.clear();
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
