import { EventEmitterBase } from "./base/EventEmitterBase";

export class EventEmitter<TData> extends EventEmitterBase<TData> {
    emit(data: TData): void {
        this.emitEvent(data);
    }
}

export type EventInterface<TData> = EventEmitter<TData>["publicInterface"];
