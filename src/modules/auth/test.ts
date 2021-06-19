import initialState from "../../fixtures/redux";
import mockStore from "../../utils/mockStore";
import { mockingAxiosError } from "../../utils/throwAxiosError";

import { action } from ".";

const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
});

describe("인증 테스트", () => {
  describe("토큰 유효성 검사", () => {
    it("서버로부터 정상 응답을 받은경우 토큰 인증을 성공한다.", async () => {
      const expectedActions = [
        { type: action.checkAccessToken.pending.toString() },
        { type: action.checkAccessToken.fulfilled.toString() },
      ];

      await store.dispatch(action.checkAccessToken());

      expect(store.getActions()).toMatchObject(expectedActions);
    });

    it("서버로부터 정상 응답을 받지못한경우 토큰 인증을 실패한다.", async () => {
      mockingAxiosError();

      const expectedActions = [
        { type: action.checkAccessToken.pending.toString() },
        { type: action.checkAccessToken.rejected.toString() },
      ];

      await store.dispatch(action.checkAccessToken());

      expect(store.getActions()).toMatchObject(expectedActions);
    });

    describe("로그인", () => {
      it("서버로부터 정상 응답을 받은경우 로그인에 성공한다.", async () => {
        const expectedActions = [
          { type: action.login.pending.toString() },
          { type: action.login.fulfilled.toString() },
        ];

        await store.dispatch(action.login({ email: "", password: "" }));

        expect(store.getActions()).toMatchObject(expectedActions);
      });

      it("서버로부터 정상 응답을 받지 못한 경우 로그인에 실패한다.", async () => {
        mockingAxiosError();

        const expectedActions = [
          { type: action.login.pending.toString() },
          { type: action.login.rejected.toString() },
        ];

        await store.dispatch(action.login({ email: "", password: "" }));

        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    describe("회원가입", () => {
      it("회원가입 성공시 로그인을 요청한다.", async () => {
        const expectedActions = [
          { type: action.signup.pending.toString() },
          { type: action.login.pending.toString() },
          { type: action.signup.fulfilled.toString() },
        ];

        await store.dispatch(
          action.signup({ email: "", age: 1, password: "" })
        );

        expect(store.getActions()).toMatchObject(expectedActions);
      });

      it("회원가입 실패시 로그인을 요청하지 않는다.", async () => {
        mockingAxiosError();

        const expectedActions = [
          { type: action.signup.pending.toString() },
          { type: action.signup.rejected.toString() },
        ];

        const loginAction = [{ type: action.login.pending.toString() }];

        await store.dispatch(
          action.signup({ email: "", age: 1, password: "" })
        );
        expect(store.getActions()).toMatchObject(expectedActions);
        expect(store.getActions().slice(-1)).not.toMatchObject(loginAction);
      });
    });

    describe("로그아웃", () => {
      it("로그아웃을 요청한다.", () => {
        const expectedActions = [{ type: action.logout.type }];

        store.dispatch(action.logout());

        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });
});
