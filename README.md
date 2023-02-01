 ![typed-emitters | Simple and convenient event emitters with separate interfaces for consumers.](https://raw.githubusercontent.com/denvifer/typed-emitters/master/docs/image.png)

100% TypeScript, no deps.

## Install

```bash
npm install typed-emitters
```

## Single-event emitter

### Provider

```typescript
import { EventEmitter } from 'typed-emitters';

private emitter = new EventEmitter<string>();
// Share the public interface
public event = this.emitter.publicInterface;

this.emitter.emit('Test string'); // Type checking
```

### Consumer

```typescript
// Consumer has access to the public interface only and can't emit events

// The type of the data is a string
event.addListener(data => { console.log(data); });
```

## Multi-event emitter

### Provider

```typescript
import { CombinedEmitter } from 'typed-emitters';

private emitter = new CombinedEmitter<{ 'type1': string, 'type2' number }>();
// Share the public interface
public events = this.emitter.publicInterface;

this.emitter.emit('type1', 'Test string'); // Type checking
this.emitter.emit('type2', 1); // Type checking
```

### Consumer

```typescript
// Consumer has access to the public interface only and can't emit events

// The type of the data is a string
events.addListener('type1', data => { console.log(data); });
// The type of the data is a number
events.addListener('type2', data => { console.log(data); });
```

## Unsubscribing

```typescript
// Option 1
event.removeListener(yourListener);

// Option 2
const disposer = event.addListener(data => { console.log(data); });
disposer();
```

## Extending base emitters

You can extend EventEmitterBase or EventsEmitterBase and implement a custom emitter, see the examples below.

### Emitting messages and errors

```typescript
import { CombinedEmitterBase } from 'typed-emitters';

export class CustomEmitter<TMessage, TError> extends CombinedEmitterBase<{ 'message': TMessage, 'error': TError }> {
  emitMessage(message: TMessage): void {
    this.emitEvent('message', data);
  }
  emitError(error: TError): void {
    this.emitEvent('error', error);
  }
}
```

### Using a custom event wrapper

```typescript
import { EventEmitterBase } from 'typed-emitters';
import { CustomEvent } from './custom-event';

export class CustomEmitter<TData> extends EventEmitterBase<CustomEvent<TData>> {
  emit(data: TData): void {
    this.emitEvent(new CustomEvent(data));
  }
}
```


