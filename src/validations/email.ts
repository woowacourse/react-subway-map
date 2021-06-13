export const isValidEmailFormat = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email.toLowerCase());
};

export const isValidEmailLength = (email: string) => {
  return email.length <= 30;
};

export const validateEmail = (email: string) => {
  if (!isValidEmailFormat(email)) {
    throw Error("유효한 이메일 형식이 아닙니다.");
  }

  if (!isValidEmailLength(email)) {
    throw Error("이메일은 30글자 이하로만 입력해주세요");
  }
};
