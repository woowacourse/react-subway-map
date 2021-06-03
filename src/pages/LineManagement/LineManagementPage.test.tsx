import { render, fireEvent, act, waitFor, cleanup } from "@testing-library/react";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../../hooks";

import LineManagementPage from "./LineManagementPage";
import initialState from "../../fixtures/redux";
import mockStore from "../../@test/mockStore";
import TEST_ID from "../../@test/testId";
import { TEST_LINE } from "../../fixtures/line";
import { Line } from "../../@types/types";

jest.mock("axios");
jest.mock("../../hooks");

interface LineInfo {
  LINE_NAME: string;
  UP_STATION_ID: number;
  DOWN_STATION_ID: number;
  DISTANCE: number;
}

const mockRedux = () => {
  const store = mockStore(initialState);

  const mockedUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
  mockedUseAppSelector.mockImplementation((selector) => selector(store.getState()));

  const mockedUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
  mockedUseAppDispatch.mockImplementation(() => store.dispatch);

  return store;
};

const initAxiosMock = () => {
  const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
  mockedAxiosGet.mockImplementation(async () => ({ data: "" }));
  const mockedAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
  mockedAxiosPost.mockImplementation(async () => ({ data: "" }));
};

const tryAddLine = async (lineInfo: LineInfo) => {
  const { getByTestId, findByTestId, findByPlaceholderText } = render(
    <>
      <LineManagementPage />
      <div id="modal"></div>
    </>
  );

  const LineAddModalOpenButton = getByTestId(TEST_ID.SECTION_MODAL_OPEN_BUTTON);

  act(() => {
    fireEvent.click(LineAddModalOpenButton);
  });

  const LineNameInput = await findByTestId(TEST_ID.LINE_NAME_INPUT);
  const UpStationSelect = await findByTestId(TEST_ID.LINE_UP_STATION_SELECT);
  const DownStationSelect = await findByTestId(TEST_ID.LINE_DOWN_STATION_SELECT);
  const DistanceInput = await findByTestId(TEST_ID.LINE_DISTANCE_INPUT);
  const LineAddButton = await findByPlaceholderText(TEST_ID.LINE_ADD_BUTTON);

  act(() => {
    fireEvent.change(LineNameInput, { target: { value: lineInfo.LINE_NAME } });
    fireEvent.select(UpStationSelect, { target: { value: lineInfo.UP_STATION_ID } });
    fireEvent.select(DownStationSelect, { target: { value: lineInfo.DOWN_STATION_ID } });
    fireEvent.change(DistanceInput, { target: { value: lineInfo.DISTANCE } });
  });

  await act(async () => {
    fireEvent.click(LineAddButton);
  });
};

const tryDeleteLine = async (id: Line["id"]) => {
  const { findByTestId } = render(
    <>
      <LineManagementPage />
      <div id="modal"></div>
    </>
  );

  const TargetLineItem = await findByTestId(`line-${id}`);
  TargetLineItem.querySelector('button[role="delete"]');

  act(() => {
    fireEvent.click(TargetLineItem);
  });
};

beforeEach(() => {
  cleanup();
  jest.spyOn(window, "alert").mockImplementation(() => true);
  initAxiosMock();
});

describe("지하철 노선", () => {
  describe("지하철 노선 조회 기능", () => {
    describe("노선과 노선의 역 데이터가 이미 존재하는 경우", () => {
      it("사용자는 노선의 정보를 조회할 수 있다", () => {
        mockRedux();

        const { findByText } = render(<LineManagementPage />);

        const [lastLine] = initialState.line.items.slice(-1);

        expect(findByText(lastLine.name));
      });
    });
  });

  describe("지하철 노선 추가 기능", () => {
    describe("입력이 모두 유효하다면", () => {
      it("사용자는 노선을 추가할 수 있다", () => {
        const store = mockRedux();

        tryAddLine(TEST_LINE);

        waitFor(() => {
          const actions = store.getActions();
          expect(actions.length).toBe(4);

          const [action1, action2, action3, action4] = actions;
          expect(action1).toMatchObject({ type: "[LINE] ADD/pending" });
          expect(action2).toMatchObject({ type: "[LINE] ADD/fulfilled" });
          expect(action3).toMatchObject({ type: "[LINE] LOAD/pending" });
          expect(action4).toMatchObject({ type: "[LINE] LOAD/fulfilled" });
        });
      });
    });

    describe("노선 이름이 2자 미만인 경우", () => {
      it("사용자는 노선을 추가할 수 없다", () => {
        const store = mockRedux();

        tryAddLine({
          ...TEST_LINE,
          LINE_NAME: "테",
        });

        waitFor(() => {
          const actions = store.getActions();
          expect(actions.length).toBe(0);
        });
      });
    });
    describe("노선 이름이 10자보다 많은 경우", () => {
      it("사용자는 노선을 추가할 수 없다", () => {
        const store = mockRedux();

        tryAddLine({
          ...TEST_LINE,
          LINE_NAME: "테스트테스트테스트테스트",
        });

        waitFor(() => {
          const actions = store.getActions();
          expect(actions.length).toBe(0);
        });
      });
    });
    describe("중복된 노선 이름이 있는 경우", () => {
      it("사용자는 노선을 추가할 수 없다", () => {
        const store = mockRedux();
        const [firstLine] = initialState.line.items;

        tryAddLine({
          ...TEST_LINE,
          LINE_NAME: firstLine.name,
        });

        waitFor(() => {
          const actions = store.getActions();
          expect(actions.length).toBe(0);
        });
      });
    });
  });

  describe("지하철 노선 삭제 기능", () => {
    describe("노선 목록에 노선이 하나라도 있다면", () => {
      it("사용자는 노선을 삭제할 수 있다", () => {
        const store = mockRedux();
        const [lastLine] = initialState.line.items.slice(-1);

        tryDeleteLine(lastLine.id);

        waitFor(() => {
          const actions = store.getActions();
          expect(actions.length).toBe(4);

          const [action1, action2, action3, action4] = actions;
          expect(action1).toMatchObject({ type: "[LINE] ADD/pending" });
          expect(action2).toMatchObject({ type: "[LINE] ADD/fulfilled" });
          expect(action3).toMatchObject({ type: "[LINE] LOAD/pending" });
          expect(action4).toMatchObject({ type: "[LINE] LOAD/fulfilled" });
        });
      });
    });
  });
});
