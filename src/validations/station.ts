const isValidFormat = (name: string) => {
  return /^[가-힣]+$/.test(name);
};

const isValidLength = (name: string) => {
  return name.length >= 2 && name.length <= 20;
};

export const validateStationName = (name: string) => {
  if (!isValidLength(name)) {
    throw Error("역의 이름은 2자 이상 20자 이하로 입력해주십시오");
  }

  if (!isValidFormat(name)) {
    throw Error("역의 이름은 공백을 제외한 한글만 가능합니다");
  }
};

//   - 역 이름: 2자 이상 20자 이하의 한글 (숫자 포함. 공백 허용 X)
