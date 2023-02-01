import { Event } from "./Event";
import { EventEmitterBase } from "./base/EventEmitterBase";

export class EventEmitter<TData> extends EventEmitterBase<Event<TData>> {
    emit(data: TData): void {
        this.emitEvent(new Event(data));
    }
}

export type EventEmitterPublicInterface<TData> =
    EventEmitter<TData>["publicInterface"];
