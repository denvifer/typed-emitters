![typed-emitters | Simple and convenient event emitters with separate interfaces for consumers.](https://raw.githubusercontent.com/denvifer/typed-emitters/master/docs/image.png)

100% Typescript, no deps.

## Install

```bash
npm install typed-emitters
```

## Single-event emitter

### Provider
```typescript
import { EventEmitter } from 'typed-emitters';

private eventEmitter = new EventEmitter<string>();
// Share the public interface
public event = this.eventEmitter.publicInterface;

this.eventEmitter.emit('Test string'); // Type checking
```

### Consumer
```typescript
// Consumer has access to the public interface only and can't emit events
event.addListener(e => { console.log(e.data); });
// The type of the e.data is a string
```

## Multi-event emitter

### Provider
```typescript
import { EventsEmitter } from 'typed-emitters';

private eventsEmitter = new EventsEmitter<{ 'type1': string, 'type2' number }>();
// Share the public interface
public events = this.eventsEmitter.publicInterface;

this.eventsEmitter.emit('type1', 'Test string'); // Type checking
this.eventsEmitter.emit('type2', 1); // Type checking
```

### Consumer
```typescript
// Consumer has access to the public interface only and can't emit events
events.addListener('type1', e => { console.log(event.data); });
// The type of the e.data is a string
events.addListener('type2', e => { console.log(event.data); });
// The type of the e.data is a number
```

## Unsubscribing

```typescript
// Option 1
event.removeListener(yourListener);

// Option 2
const disposer = event.addListener(e => { console.log(e.data); });
disposer();
```

## Extending base emitters
You can extend EventEmitterBase or EventsEmitterBase and implement a custom version, for example, working with another Event implementation.

```typescript
import { EventEmitterBase } from 'typed-emitters';
import { CustomEvent } from './custom-event';

export class CustomEventEmitter<TData> extends EventEmitterBase<CustomEvent<TData>> {
// ...
}
```
