import { render, fireEvent, act, waitFor, cleanup } from "@testing-library/react";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../../hooks";

import SectionManagementPage from "./SectionManagementPage";
import initialState from "../../fixtures/redux";
import mockStore from "../../@test/mockStore";
import { TEST_ID } from "../../@test/testId";
import { TEST_SECTION } from "../../fixtures/section";
import { Station } from "../../@types/types";

jest.mock("axios");
jest.mock("../../hooks");

interface SectionInfo {
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

const tryAddSection = async (sectionInfo: SectionInfo) => {
  const { getByTestId, findByTestId, findByPlaceholderText } = render(
    <>
      <SectionManagementPage />
      <div id="modal"></div>
    </>
  );

  const SectionAddModalOpenButton = getByTestId(TEST_ID.SECTION_MODAL_OPEN_BUTTON);

  act(() => {
    fireEvent.click(SectionAddModalOpenButton);
  });

  const UpStationSelect = await findByTestId(TEST_ID.SECTION_UP_STATION_SELECT);
  const DownStationSelect = await findByTestId(TEST_ID.SECTION_DOWN_STATION_SELECT);
  const DistanceInput = await findByTestId(TEST_ID.SECTION_DISTANCE_INPUT);
  const SectionAddButton = await findByPlaceholderText(TEST_ID.SECTION_ADD_BUTTON);

  act(() => {
    fireEvent.select(UpStationSelect, { target: { value: sectionInfo.UP_STATION_ID } });
    fireEvent.select(DownStationSelect, { target: { value: sectionInfo.DOWN_STATION_ID } });
    fireEvent.change(DistanceInput, { target: { value: sectionInfo.DISTANCE } });
  });

  // TODO : 여기 에러 지우기 - addSection mock?
  await act(async () => {
    fireEvent.click(SectionAddButton);
  });
};

const tryDeleteSection = async (name: Station["name"]) => {
  const { findByTestId } = render(
    <>
      <SectionManagementPage />
      <div id="modal"></div>
    </>
  );

  const TargetLineItem = await findByTestId(`section-item-${name}`);
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

describe("지하철 구간", () => {
  describe("지하철 구간 조회 기능", () => {
    describe("노선과 노선의 역 데이터가 이미 존재하는 경우", () => {
      it("사용자는 노선의 구간 정보를 조회할 수 있다", () => {
        mockRedux();

        const { findByText } = render(<SectionManagementPage />);

        const [lastLine] = initialState.line.items.slice(-1);
        const [lastStationInLine] = lastLine.stations.slice(-1);

        expect(findByText(lastStationInLine.name));
      });
    });
  });

  describe("지하철 구간 추가 기능", () => {
    describe("입력이 모두 유효하다면", () => {
      it("사용자는 노선에 구간을 추가할 수 있다", () => {
        const store = mockRedux();
        tryAddSection(TEST_SECTION);

        waitFor(() => {
          const actions = store.getActions();
          expect(actions.length).toBe(4);

          const [action1, action2, action3, action4] = actions;
          expect(action1).toMatchObject({ type: "[LINE] SECTION_ADD/pending" });
          expect(action2).toMatchObject({ type: "[LINE] SECTION_ADD/fulfilled" });
          expect(action3).toMatchObject({ type: "[LINE] LOAD/pending" });
          expect(action4).toMatchObject({ type: "[LINE] LOAD/fulfilled" });
        });
      });
    });
  });
  describe("이미 등록된 구간을 등록하려하는 경우", () => {
    it("사용자는 노선에 구간을 추가할 수 없다", () => {
      const store = mockRedux();
      const [firstLine] = initialState.line.items;
      const [firstStationInLine, secondStationInLine] = firstLine.stations;

      tryAddSection({
        ...TEST_SECTION,
        UP_STATION_ID: firstStationInLine.id,
        DOWN_STATION_ID: secondStationInLine.id,
      });

      waitFor(() => {
        const actions = store.getActions();
        expect(actions.length).toBe(0);
      });
    });
  });
  describe("추가하려는 구간으로 인해 노선에서 갈래길이 생기는 경우", () => {
    it("사용자는 노선에 구간을 추가할 수 없다", () => {
      const store = mockRedux();
      const [firstLine, secondLine] = initialState.line.items;
      const [firstLineStation] = firstLine.stations;
      const [secondLineStation] = secondLine.stations;

      tryAddSection({
        ...TEST_SECTION,
        UP_STATION_ID: firstLineStation.id,
        DOWN_STATION_ID: secondLineStation.id,
      });

      waitFor(() => {
        const actions = store.getActions();
        expect(actions.length).toBe(0);
      });
    });
  });
  describe("지하철 구간 삭제 기능", () => {
    describe("노선에 구간이 하나라도 있다면", () => {
      it("사용자는 구간을 삭제할 수 있다", () => {
        const store = mockRedux();

        const [firstLine] = initialState.line.items;
        const [lastStationInLine] = firstLine.stations;

        tryDeleteSection(lastStationInLine.name);

        waitFor(() => {
          const actions = store.getActions();
          expect(actions.length).toBe(4);

          const [action1, action2, action3, action4] = actions;
          expect(action1).toMatchObject({ type: "[LINE] SECTION_DELETE/pending" });
          expect(action2).toMatchObject({ type: "[LINE] SECTION_DELETE/fulfilled" });
          expect(action3).toMatchObject({ type: "[LINE] LOAD/pending" });
          expect(action4).toMatchObject({ type: "[LINE] LOAD/fulfilled" });
        });
      });
    });
  });
});
