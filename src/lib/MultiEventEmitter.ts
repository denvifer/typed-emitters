import { MultiEventEmitterBase } from "./base/MultiEventEmitterBase";

export class MultiEventEmitter<
    TDataTypesIndex extends Record<string | number, unknown>
> extends MultiEventEmitterBase<
    TDataTypesIndex,
    { [key in keyof TDataTypesIndex]: TDataTypesIndex[key] }
> {
    emit<TEvent extends keyof TDataTypesIndex>(
        type: TEvent,
        data: TDataTypesIndex[TEvent]
    ): void {
        this.emitEvent(type, data);
    }
}

export type MultiEventInterface<
    TDataTypesIndex extends Record<string | number, unknown>
> = MultiEventEmitter<TDataTypesIndex>["publicInterface"];
