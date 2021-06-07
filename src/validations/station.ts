import { isKoreanCharacters } from "./@shared/korean";

const isValidLength = (name: string) => {
  return name.length >= 2 && name.length <= 20;
};

const validateStationName = (name: string) => {
  if (!isValidLength(name)) {
    throw Error("역의 이름은 2자 이상 20자 이하로 입력해주십시오");
  }

  if (!isKoreanCharacters(name)) {
    throw Error("역의 이름은 공백을 제외한 한글만 가능합니다");
  }
};

export { validateStationName };
