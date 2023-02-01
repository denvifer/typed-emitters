import { CombinedEmitterBase } from "./base/CombinedEmitterBase";

export class CombinedEmitter<
    TDataTypesIndex extends Record<string | number, unknown>
> extends CombinedEmitterBase<
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

export type CombinedEmitterPublicInterface<
    TDataTypesIndex extends Record<string | number, unknown>
> = CombinedEmitter<TDataTypesIndex>["publicInterface"];
