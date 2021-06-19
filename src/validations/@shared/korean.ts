const isKoreanCharacters = (name: string) => {
  return /^[가-힣]+$/.test(name);
};

const isKoreanOrNumberCharacters = (name: string) => {
  return /^[가-힣|0-9]+$/.test(name);
};

export { isKoreanCharacters, isKoreanOrNumberCharacters };
