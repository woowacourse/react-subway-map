import initialState from "../../__mock__/redux";
import mockStore from "../../__mock__/mockStore";
import { mockingAxiosError } from "../../__mock__/throwAxiosError";

import { action } from ".";

const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
});

describe("노선 테스트", () => {
  describe("전체 노선 조회", () => {
    it("서버로부터 정상 응답을 받은경우 노선 조회를 성공한다.", async () => {
      const expectedActions = [
        { type: action.getLines.pending.toString() },
        { type: action.getLines.fulfilled.toString() },
      ];

      await store.dispatch(action.getLines());

      expect(store.getActions()).toMatchObject(expectedActions);
    });

    it("서버로부터 정상 응답을 받지못한경우 노선 조회를 실패한다.", async () => {
      mockingAxiosError();

      const expectedActions = [
        { type: action.getLines.pending.toString() },
        { type: action.getLines.rejected.toString() },
      ];

      await store.dispatch(action.getLines());

      expect(store.getActions()).toMatchObject(expectedActions);
    });

    describe("노선 추가", () => {
      it("서버로부터 정상 응답을 받은경우 노선 추가를 성공한다.", async () => {
        const expectedActions = [
          { type: action.addLine.pending.toString() },
          { type: action.addLine.fulfilled.toString() },
        ];

        await store.dispatch(
          action.addLine({
            upStationId: 1,
            downStationId: 2,
            name: "순천역",
            color: "bg-blue-100",
            distance: 375,
          })
        );

        expect(store.getActions()).toMatchObject(expectedActions);
      });

      it("서버로부터 정상 응답을 받지 못한 경우 노선 추가에 실패한다.", async () => {
        mockingAxiosError();

        const expectedActions = [
          { type: action.addLine.pending.toString() },
          { type: action.addLine.rejected.toString() },
        ];

        await store.dispatch(
          action.addLine({
            upStationId: 1,
            downStationId: 2,
            name: "순천역",
            color: "bg-blue-100",
            distance: 375,
          })
        );

        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    describe("노선 삭제", () => {
      it("서버로부터 정상 응답을 받지 못한 경우 노선 삭제에 실패한다.", async () => {
        const expectedActions = [
          { type: action.deleteLine.pending.toString() },
          { type: action.deleteLine.fulfilled.toString() },
        ];

        await store.dispatch(action.deleteLine(1));

        expect(store.getActions()).toMatchObject(expectedActions);
      });

      it("서버로부터 정상 응답을 받지 못한 경우 노선 삭제에 실패한다.", async () => {
        mockingAxiosError();

        const expectedActions = [
          { type: action.deleteLine.pending.toString() },
          { type: action.deleteLine.rejected.toString() },
        ];

        await store.dispatch(action.deleteLine(1));

        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    describe("구간 추가", () => {
      it("서버로부터 정상 응답을 받지 못한 경우 구간 추가에 실패한다.", async () => {
        const expectedActions = [
          { type: action.addSection.pending.toString() },
          { type: action.addSection.fulfilled.toString() },
        ];

        await store.dispatch(
          action.addSection({
            upStationId: 1,
            downStationId: 2,
            lineId: 3,
            distance: 4,
          })
        );

        expect(store.getActions()).toMatchObject(expectedActions);
      });

      it("서버로부터 정상 응답을 받지 못한 경우 구간 추가에 실패한다.", async () => {
        mockingAxiosError();

        const expectedActions = [
          { type: action.addSection.pending.toString() },
          { type: action.addSection.rejected.toString() },
        ];

        await store.dispatch(
          action.addSection({
            upStationId: 1,
            downStationId: 2,
            lineId: 3,
            distance: 4,
          })
        );
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    describe("구간 삭제", () => {
      it("서버로부터 정상 응답을 받지 못한 경우 구간 삭제에 실패한다.", async () => {
        const expectedActions = [
          { type: action.deleteSection.pending.toString() },
          { type: action.deleteSection.fulfilled.toString() },
        ];

        await store.dispatch(action.deleteSection({ lineId: 1, stationId: 2 }));

        expect(store.getActions()).toMatchObject(expectedActions);
      });

      it("서버로부터 정상 응답을 받지 못한 경우 구간 삭제에 실패한다.", async () => {
        mockingAxiosError();

        const expectedActions = [
          { type: action.deleteSection.pending.toString() },
          { type: action.deleteSection.rejected.toString() },
        ];

        await store.dispatch(action.deleteSection({ lineId: 1, stationId: 2 }));

        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });
});
