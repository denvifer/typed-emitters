import { EventEmitterBase } from "../../lib/base/EventEmitterBase";

describe("EventEmitterBase", () => {
    const emitterBase = new EventEmitterBase();

    const listener = jest.fn();

    it("saves a listener", () => {
        emitterBase.addListener(listener);
        expect(emitterBase.hasListeners()).toBe(true);
    });

    it("removes the listener", () => {
        emitterBase.removeListener(listener);
        expect(emitterBase.hasListeners()).toBe(false);
    });
});
