![typed-emitters | Simple and convenient event emitters with separate interfaces for consumers.](https://raw.githubusercontent.com/denvifer/typed-emitters/master/docs/image.png)

<div align="center">
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
import { createSingleEventEmitter } from "typed-emitters";
```

```typescript
const emitter = // Or private class field
    createSingleEventEmitter<
        [string, number] // Multiple args are supported
    >();

// Share the public interface
export const event = this.emitter.source; // Or public class field
```

```typescript
emitter.emit("Test string", 1); // Type checking
```

### Consumer

```typescript
// Consumer has access only to the public interface (can listen but not emit)

// The type of args is [string, number]
event.addListener((...args) => {
    console.log(args);
});
```

## Multi-event emitter

### Provider

```typescript
import { createMultiEventEmitter } from "typed-emitters";
```

```typescript
const emitter = // Or private class field
    createMultiEventEmitter<{
        'type1': [number],
        'type2' [string, number]
    }>();

// Share the public interface
export const events = this.emitter.source; // Or public class field
```

```typescript
emitter.emit("type1", 1); // Type checking
emitter.emit("type2", "Test string", 1); // Type checking
```

### Consumer

```typescript
// Consumer has access only to the public interface (can listen but not emit)

// The type of value is number
events.addListener("type1", (value) => {
    console.log(value);
});

// The type of args is [string, number]
events.addListener("type2", (...args) => {
    console.log(args);
});
```

## Unsubscribing

```typescript
// Option 1
event.removeListener(yourListener);

// Option 2
const dispose = event.addListener((...args) => {
    console.log(args);
});
dispose();
```

## Other

### Check if an emitter has listeners

```typescript
emitter.hasListeners();
```

```typescript
emitter.hasListeners("type1");
```

### Removing all listeners

```typescript
emitter.removeAllListeners();
```

```typescript
emitter.removeAllListeners("type1");
```

### Exported types

-   `SingleEventEmitter<Args>`
-   `SingleEventSource<Args>`
-   `MultiEventEmitter<ArgsByEventName>`
-   `MultiEventSource<ArgsByEventName>`
