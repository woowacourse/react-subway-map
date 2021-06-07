const validateAge = (age: string) => {
  const ageAsNumber = Number(age);

  if (ageAsNumber < 0 || ageAsNumber > 200) {
    throw Error("나이는 200살 미만 0살 이상으로 입력해주세요");
  }
};

export { validateAge };
