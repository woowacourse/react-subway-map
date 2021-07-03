import initialState from "../../__mock__/redux";
import mockStore from "../../__mock__/mockStore";
import { mockingAxiosError } from "../../__mock__/throwAxiosError";

import { action } from ".";

const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
});

describe("역 테스트", () => {
  describe("전체 역 조회", () => {
    it("서버로부터 정상 응답을 받은경우 역 조회를 성공한다.", async () => {
      const expectedActions = [
        { type: action.getStations.pending.toString() },
        { type: action.getStations.fulfilled.toString() },
      ];

      await store.dispatch(action.getStations());

      expect(store.getActions()).toMatchObject(expectedActions);
    });

    it("서버로부터 정상 응답을 받지못한경우 역 조회를 실패한다.", async () => {
      mockingAxiosError();

      const expectedActions = [
        { type: action.getStations.pending.toString() },
        { type: action.getStations.rejected.toString() },
      ];

      await store.dispatch(action.getStations());

      expect(store.getActions()).toMatchObject(expectedActions);
    });

    describe("역 추가", () => {
      it("서버로부터 정상 응답을 받은경우 역 추가를 성공한다.", async () => {
        const expectedActions = [
          { type: action.addStation.pending.toString() },
          { type: action.addStation.fulfilled.toString() },
        ];

        await store.dispatch(action.addStation("순천역"));

        expect(store.getActions()).toMatchObject(expectedActions);
      });

      it("서버로부터 정상 응답을 받지 못한 경우 역 추가에 실패한다.", async () => {
        mockingAxiosError();

        const expectedActions = [
          { type: action.addStation.pending.toString() },
          { type: action.addStation.rejected.toString() },
        ];

        await store.dispatch(action.addStation("순천역"));

        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    describe("역 삭제", () => {
      it("서버로부터 정상 응답을 받지 못한 경우 역 삭제에 실패한다.", async () => {
        const expectedActions = [
          { type: action.deleteStation.pending.toString() },
          { type: action.deleteStation.fulfilled.toString() },
        ];

        await store.dispatch(action.deleteStation(1));

        expect(store.getActions()).toMatchObject(expectedActions);
      });

      it("서버로부터 정상 응답을 받지 못한 경우 역 삭제에 실패한다.", async () => {
        mockingAxiosError();

        const expectedActions = [
          { type: action.deleteStation.pending.toString() },
          { type: action.deleteStation.rejected.toString() },
        ];

        await store.dispatch(action.deleteStation(1));

        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });
});
