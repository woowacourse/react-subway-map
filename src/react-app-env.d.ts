/// <reference types="react-scripts" />

declare interface ObjectConstructor {
  keys<T>(obj: T): Array<keyof T>;
}

declare module React {
  type ChangeEventHandler<T = Element, targetValue> = (
    event: { target: { value: targetValue } } & ChangeEvent<T>
  ) => void;
}
