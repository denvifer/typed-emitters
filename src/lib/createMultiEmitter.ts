import { removeFromArray } from "./utils/removeFromArray";

export const createMultiEmitter = <
    ArgsByEventName extends Record<string | number, Array<unknown>>
>() => {
    const listeners = {} as {
        [EventName in keyof ArgsByEventName]: Array<
            (...args: ArgsByEventName[EventName]) => void
        >;
    };

    const removeListener = <EventName extends keyof ArgsByEventName>(
        eventName: EventName,
        listener: (...args: ArgsByEventName[EventName]) => void
    ): void => {
        if (eventName in listeners) {
            removeFromArray(listeners[eventName], listener);
        }
    };

    const addListener = <EventName extends keyof ArgsByEventName>(
        eventName: EventName,
        listener: (...args: ArgsByEventName[EventName]) => void
    ): (() => void) => {
        if (!(eventName in listeners)) {
            listeners[eventName] = [];
        }
        listeners[eventName].push(listener);
        return () => {
            removeListener(eventName, listener);
        };
    };

    const hasListeners = <EventName extends keyof ArgsByEventName>(
        eventName: EventName
    ) => !!(eventName in listeners && listeners[eventName].length);

    const emit = <EventName extends keyof ArgsByEventName>(
        eventName: EventName,
        ...args: ArgsByEventName[EventName]
    ) => {
        if (eventName in listeners) {
            listeners[eventName].forEach((listener) => {
                listener(...args);
            });
        }
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

export type MultiEmitterInterface<
    ArgsByEventName extends Record<string | number, Array<unknown>>
> = ReturnType<typeof createMultiEmitter<ArgsByEventName>>;

export type MultiEventInterface<
    ArgsByEventName extends Record<string | number, Array<unknown>>
> = ReturnType<typeof createMultiEmitter<ArgsByEventName>>["publicInterface"];
