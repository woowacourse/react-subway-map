const validatePassword = (password: string) => {
  if (password.length < 4 || password.length > 20) {
    throw Error("비밀번호는 4글자 이상 20글자 이하로 입력해주세요");
  }
};

const validatePasswordConfirm = (password: string, passwordConfirm: string) => {
  if (password !== passwordConfirm) {
    throw Error("비밀번호가 일치하지 않습니다");
  }
};

export { validatePassword, validatePasswordConfirm };
