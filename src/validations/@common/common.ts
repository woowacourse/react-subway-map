export const isKoreanCharacters = (name: string) => {
  return /^[가-힣]+$/.test(name);
};

export const isKoreanOrNumberCharacters = (name: string) => {
  return /^[가-힣|0-9]+$/.test(name);
};
