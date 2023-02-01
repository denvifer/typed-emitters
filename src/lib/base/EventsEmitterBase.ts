import { removeFromArray } from "../utils/removeFromArray";

export class EventsEmitterBase<
    TDataTypesIndex extends Record<string | number, unknown>,
    TEventTypesIndex extends { [key in keyof TDataTypesIndex]: unknown }
> {
    protected listeners = {} as {
        [P in keyof TDataTypesIndex]: Array<(e: TEventTypesIndex[P]) => void>;
    };

    addListener = <TKey extends keyof TDataTypesIndex>(
        type: TKey,
        listener: (e: TEventTypesIndex[TKey]) => void
    ): (() => void) => {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(listener);
        return () => {
            this.removeListener(type, listener);
        };
    };

    removeListener = <TKey extends keyof TDataTypesIndex>(
        type: TKey,
        listener: (e: TEventTypesIndex[TKey]) => void
    ): void => {
        if (type in this.listeners) {
            removeFromArray(this.listeners[type], listener);
        }
    };

    get publicInterface(): {
        addListener: <TKey extends keyof TDataTypesIndex>(
            type: TKey,
            listener: (e: TEventTypesIndex[TKey]) => void
        ) => () => void;
        removeListener: <TKey extends keyof TDataTypesIndex>(
            type: TKey,
            listener: (e: TEventTypesIndex[TKey]) => void
        ) => void;
    } {
        return {
            addListener: this.addListener,
            removeListener: this.removeListener,
        };
    }

    hasListeners<TKey extends keyof TDataTypesIndex>(type: TKey): boolean {
        return !!(type in this.listeners && this.listeners[type].length);
    }

    protected emitEvent<TKey extends keyof TDataTypesIndex>(
        type: TKey,
        event: TEventTypesIndex[TKey]
    ): void {
        if (type in this.listeners) {
            this.listeners[type].forEach((listener) => {
                listener(event);
            });
        }
    }
}

export type EventsEmitterBasePublicInterface<
    TDataTypesIndex extends Record<string | number, unknown>,
    TEventTypesIndex extends { [key in keyof TDataTypesIndex]: unknown }
> = EventsEmitterBase<TDataTypesIndex, TEventTypesIndex>["publicInterface"];
