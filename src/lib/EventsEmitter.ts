import { Event } from "./Event";
import { EventsEmitterBase } from "./base/EventsEmitterBase";

export class EventsEmitter<
    TDataTypesIndex extends Record<string | number, unknown>
> extends EventsEmitterBase<
    TDataTypesIndex,
    { [key in keyof TDataTypesIndex]: Event<TDataTypesIndex[key]> }
> {
    emit<TEvent extends keyof TDataTypesIndex>(
        type: TEvent,
        data: TDataTypesIndex[TEvent]
    ): void {
        this.emitEvent(type, new Event(data));
    }
}

export type EventsEmitterPublicInterface<
    TDataTypesIndex extends Record<string | number, unknown>
> = EventsEmitter<TDataTypesIndex>["publicInterface"];
