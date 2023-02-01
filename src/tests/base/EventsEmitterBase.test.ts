import { EventsEmitterBase } from "../../lib/base/EventsEmitterBase";

describe("EventsEmitterBase", () => {
    enum Events {
        Type1,
        Type2,
    }

    const eventsEmitterBase = new EventsEmitterBase();
    const listener = jest.fn();

    it("saves a listener of the first event type", () => {
        eventsEmitterBase.addListener(Events.Type1, listener);
        expect(eventsEmitterBase.hasListeners(Events.Type1)).toBe(true);
        expect(eventsEmitterBase.hasListeners(Events.Type2)).toBe(false);
    });

    it("saves a listener of the second event type", () => {
        eventsEmitterBase.addListener(Events.Type2, listener);
        expect(eventsEmitterBase.hasListeners(Events.Type1)).toBe(true);
        expect(eventsEmitterBase.hasListeners(Events.Type2)).toBe(true);
    });

    it("removes the listener of the second event type", () => {
        eventsEmitterBase.removeListener(Events.Type2, listener);
        expect(eventsEmitterBase.hasListeners(Events.Type1)).toBe(true);
        expect(eventsEmitterBase.hasListeners(Events.Type2)).toBe(false);
    });

    it("saves the listener of the first event type", () => {
        eventsEmitterBase.removeListener(Events.Type1, listener);
        expect(eventsEmitterBase.hasListeners(Events.Type1)).toBe(false);
        expect(eventsEmitterBase.hasListeners(Events.Type2)).toBe(false);
    });
});
