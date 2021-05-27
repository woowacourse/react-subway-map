const REGEX = {
  ONLY_DIGIT: /^[0-9]+$/,
  KOREAN_DIGIT: /^[가-힣0-9]+$/,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD: /^[0-9A-Za-z@$!%*?&]{8,14}$/,
};

export default REGEX;
