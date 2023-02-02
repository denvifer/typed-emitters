import { MultiEventEmitterBase } from "../../lib/base/MultiEventEmitterBase";

describe("MultiEventEmitterBase", () => {
    enum Events {
        Type1,
        Type2,
    }

    const emitterBase = new MultiEventEmitterBase();
    const listener = jest.fn();

    it("saves a listener of the first event type", () => {
        emitterBase.addListener(Events.Type1, listener);
        expect(emitterBase.hasListeners(Events.Type1)).toBe(true);
        expect(emitterBase.hasListeners(Events.Type2)).toBe(false);
    });

    it("saves a listener of the second event type", () => {
        emitterBase.addListener(Events.Type2, listener);
        expect(emitterBase.hasListeners(Events.Type1)).toBe(true);
        expect(emitterBase.hasListeners(Events.Type2)).toBe(true);
    });

    it("removes the listener of the second event type", () => {
        emitterBase.removeListener(Events.Type2, listener);
        expect(emitterBase.hasListeners(Events.Type1)).toBe(true);
        expect(emitterBase.hasListeners(Events.Type2)).toBe(false);
    });

    it("saves the listener of the first event type", () => {
        emitterBase.removeListener(Events.Type1, listener);
        expect(emitterBase.hasListeners(Events.Type1)).toBe(false);
        expect(emitterBase.hasListeners(Events.Type2)).toBe(false);
    });
});
