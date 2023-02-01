# typed-emitters

Simple and convenient event emitters with separate interfaces for consumers.

100% Typescript, no deps.

## Install

```bash
npm install typed-emitters
```

## Single-event emitter

```typescript
import { EventEmitter } from 'typed-emitters'

// Save the emitter in a private field
private eventEmitter = new EventEmitter<string>();
// Save the public interface in a public field
public event = this.eventEmitter.publicInterface;
// If you don't need such a control, you can use the emitter for both emitting and subscribing

// Emit event
this.eventEmitter.emit('Test string'); // Type checking

// Consumer has access to the public interface only and can't emit events
provider.event.addListener(e => { console.log(e.data); });
// The type of the e.data is a string
```

## Multi-event emitter

```typescript
import { EventsEmitter } from 'typed-emitters'

// Save the emitter in a private field
private eventsEmitter = new EventsEmitter<{ 'type1': string, 'type2' number }>();
// Save the public interface in a public field
public events = this.eventsEmitter.publicInterface;
// If you don't need such a control, you can use the emitter for both emitting and subscribing

// Emit events
this.eventsEmitter.emit('type1', 'Test string'); // Type checking
this.eventsEmitter.emit('type2', 1); // Type checking

// Consumer has access to the public interface only and can't emit events
provider.events.addListener('type1', e => { console.log(event.data); });
// The type of the e.data is a string
provider.events.addListener('type2', e => { console.log(event.data); });
// The type of the e.data is a number
```


