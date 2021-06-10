import { TEST_ID } from "../../@test/testId";
import { SignupInfo } from "../../@types/types";
import { INPUT_PLACEHOLDER } from "../../constants/placeholder";
import { generate } from "randomstring";

const trySignup = (signUpInfo: SignupInfo) => {
  cy.findByPlaceholderText(INPUT_PLACEHOLDER.EMAIL).type(signUpInfo.email);
  cy.findByPlaceholderText(INPUT_PLACEHOLDER.AGE).type(signUpInfo.age);
  cy.findByPlaceholderText(INPUT_PLACEHOLDER.PASSWORD).type(signUpInfo.password);
  cy.findByPlaceholderText(INPUT_PLACEHOLDER.PASSWORD_CONFIRM).type(signUpInfo.passwordConfirm);
  cy.findByTestId(TEST_ID.SIGNUP_BUTTON).click();
};

const getRandomSignupInfo = () => {
  return {
    email: `${generate({ length: 12 })}@gmail.com`,
    age: "21",
    password: "test1234",
    passwordConfirm: "test1234",
  };
};

describe("회원가입", () => {
  beforeEach(() => {
    cy.visit("/signup");
    cy.clearLocalStorage();
    cy.intercept("POST", "/members").as("signup");
  });

  describe("유효성 검사", () => {
    it("모든 유효성 검사를 통과한다면 회원가입 요청을 보낼 수 있다", () => {
      trySignup(getRandomSignupInfo());

      cy.get("@signup").should("exist");
    });

    it("이메일 형식이 올바르지 않다면 회원가입 요청을 보낼 수 없다", () => {
      trySignup({
        ...getRandomSignupInfo(),
        email: "wrongEmailWithoutAt",
      });

      cy.get("@signup").should("not.exist");
    });

    it("이메일 전체 글자 수가 30글자를 넘는다면 회원가입 요청을 보낼 수 없다", () => {
      trySignup({
        ...getRandomSignupInfo(),
        email: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest@gmail.com",
      });

      cy.get("@signup").should("not.exist");
    });

    it("비밀번호가 4글자 미만이라면 회원가입 요청을 보낼 수 없다", () => {
      trySignup({
        ...getRandomSignupInfo(),
        password: "tes",
        passwordConfirm: "tes",
      });

      cy.get("@signup").should("not.exist");
    });

    it("비밀번호가 20글자보다 많다면 회원가입 요청을 보낼 수 없다", () => {
      trySignup({
        ...getRandomSignupInfo(),
        password: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
        passwordConfirm: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
      });

      cy.get("@signup").should("not.exist");
    });

    it("비밀번호와 비밀번호 확인이 일치하지 않는다면 회원가입 요청을 보낼 수 없다", () => {
      trySignup({
        ...getRandomSignupInfo(),
        password: "test1234",
        passwordConfirm: "test14151",
      });

      cy.get("@signup").should("not.exist");
    });
  });

  describe("회원가입 실패 / 성공", () => {
    it("회원가입에 성공 시 로그인 페이지로 이동한다", () => {
      trySignup(getRandomSignupInfo());

      cy.get("@signup").then((res) => {
        expect(res.response.statusCode).equal(201);
      });

      cy.findByTestId(TEST_ID.LOGIN_PAGE).should("exist");
    });

    it("이메일이 중복될 경우, 회원가입이 실패하여 그대로 페이지에 남아 있는다", () => {
      cy.fixture("user").then(({ registeredUser }) => {
        trySignup({
          ...getRandomSignupInfo(),
          email: registeredUser.email,
        });
      });

      cy.get("@signup").then((res) => {
        expect(res.response.statusCode).equal(422);
      });

      cy.findByTestId(TEST_ID.STATION_PAGE).should("not.exist");
    });
  });
});
