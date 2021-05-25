export const isKoreanAndNumber = (value: string): boolean => !/[^가-힣|0-9]/.test(value);
