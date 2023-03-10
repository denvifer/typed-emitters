 ![typed-emitters | Simple and convenient event emitters with separate interfaces for consumers.](https://raw.githubusercontent.com/denvifer/typed-emitters/master/docs/image.png)
 
<div align="center">
  <a href="https://www.npmjs.com/package/typed-emitters" alt=“npm downloads”>
      <img src="https://img.shields.io/npm/dw/typed-emitters" />
  </a>
  <a href="https://bundlephobia.com/package/typed-emitters" alt=“bundlephobia min”>
      <img src="https://img.shields.io/bundlephobia/min/typed-emitters" />
  </a>
  <a href="https://bundlephobia.com/package/typed-emitters" alt=“bundlephobia minzip”>
      <img src="https://img.shields.io/bundlephobia/minzip/typed-emitters" />
  </a>
  <a href="https://github.com/denvifer/typed-emitters/blob/master/LICENSE" alt=“license”>
      <img src="https://img.shields.io/github/license/denvifer/typed-emitters" />
  </a>
  <a href="https://www.npmjs.com/package/typed-emitters?activeTab=versions" alt=“version”>
      <img src="https://img.shields.io/npm/v/typed-emitters" />
  </a>
</div>

100% TypeScript, no deps.

## Install

```bash
npm install typed-emitters
```

## Single-event emitter

### Provider

```typescript
import { EventEmitter } from 'typed-emitters';
```
```typescript
private emitter = new EventEmitter<string>();
// Share the public interface
public event = this.emitter.publicInterface;
```
```typescript
this.emitter.emit('Test string'); // Type checking
```

### Consumer

```typescript
// Consumer has access only to the public interface (can listen but not emit)

// The type of the data is a string
event.addListener(data => { console.log(data); });
```

## Multi-event emitter

### Provider

```typescript
import { MultiEventEmitter } from 'typed-emitters';
```
```typescript
private emitter = new MultiEventEmitter<{ 'type1': string, 'type2' number }>();
// Share the public interface
public events = this.emitter.publicInterface;
```
```typescript
this.emitter.emit('type1', 'Test string'); // Type checking
this.emitter.emit('type2', 1); // Type checking
```

### Consumer

```typescript
// Consumer has access only to the public interface (can listen but not emit)

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

You can extend EventEmitterBase or MultiEventEmitterBase to implement a custom emitter, see the examples below.

### Emitting messages and errors

```typescript
import { MultiEventEmitterBase } from 'typed-emitters';

export class CustomEmitter<TMessage, TError> extends MultiEventEmitterBase<{
  'message': TMessage,
  'error': TError,
}> {
  emitMessage(message: TMessage): void {
    this.emitEvent('message', message);
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


