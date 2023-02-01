import { EventEmitterBase } from "../../lib/base/EventEmitterBase";

describe("EventEmitterBase", () => {
    const eventEmitterBase = new EventEmitterBase();

    const listener = jest.fn();

    it("saves a listener", () => {
        eventEmitterBase.addListener(listener);
        expect(eventEmitterBase.hasListeners()).toBe(true);
    });

    it("removes the listener", () => {
        eventEmitterBase.removeListener(listener);
        expect(eventEmitterBase.hasListeners()).toBe(false);
    });
});
