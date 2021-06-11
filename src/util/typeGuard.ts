export const isMyEnumTypeBy = <T>(MyEnum: T) => (
  testingValue: unknown
): testingValue is T[keyof T] => {
  return Object.values(MyEnum).includes(testingValue);
};
