import { removeFromArray } from "../utils/removeFromArray";

export class EventEmitterBase<TEvent> {
    protected listeners: Array<(e: TEvent) => void> = [];

    addListener = (listener: (e: TEvent) => void): (() => void) => {
        this.listeners.push(listener);
        return () => {
            this.removeListener(listener);
        };
    };

    removeListener = (listener: (e: TEvent) => void): void => {
        removeFromArray(this.listeners, listener);
    };

    get publicInterface(): {
        addListener: (listener: (e: TEvent) => void) => () => void;
        removeListener: (listener: (e: TEvent) => void) => void;
    } {
        return {
            addListener: this.addListener,
            removeListener: this.removeListener,
        };
    }

    hasListeners(): boolean {
        return !!this.listeners.length;
    }

    protected emitEvent(event: TEvent): void {
        this.listeners.forEach((listener) => {
            listener(event);
        });
    }
}

export type EventInterfaceBase<TEvent> =
    EventEmitterBase<TEvent>["publicInterface"];
