import { removeFromArray } from "./utils/removeFromArray";

type Listeners<
    ArgsByEventName extends Record<string | number, Array<unknown>>
> = {
    [EventName in keyof ArgsByEventName]: Array<
        (...args: ArgsByEventName[EventName]) => void
    >;
};

export const createMultiEmitter = <
    ArgsByEventName extends Record<string | number, Array<unknown>>
>() => {
    let listeners = {} as Listeners<ArgsByEventName>;

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

    const removeAllListeners = <EventName extends keyof ArgsByEventName>(
        eventName?: EventName
    ) => {
        if (eventName !== undefined) {
            listeners[eventName] = [];
        } else {
            listeners = {} as Listeners<ArgsByEventName>;
        }
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

export type MultiEmitterInterface<
    ArgsByEventName extends Record<string | number, Array<unknown>>
> = ReturnType<typeof createMultiEmitter<ArgsByEventName>>;

export type MultiEventInterface<
    ArgsByEventName extends Record<string | number, Array<unknown>>
> = ReturnType<typeof createMultiEmitter<ArgsByEventName>>["publicInterface"];
