export const isKoreanAndNumber = (value: string): boolean => !/[^가-힣|0-9]/.test(value);

export const isEnglishAndNumber = (value: string): boolean => !/[^a-zA-Z|0-9]/.test(value);

export const isEmail = (value: string): boolean =>
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(value);
