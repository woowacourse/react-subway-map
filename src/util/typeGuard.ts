export const isMyEnumTypeBy = <T>(e: T) => (testingValue: unknown): testingValue is T[keyof T] => {
  return Object.values(e).includes(testingValue);
};
