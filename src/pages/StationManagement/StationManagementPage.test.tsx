import { render, fireEvent, act, waitFor, cleanup } from "@testing-library/react";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../../hooks";

import StationManagementPage from "./StationManagementPage";
import initialState from "../../fixtures/redux";
import mockStore from "../../@test/mockStore";

jest.mock("axios");
jest.mock("../../hooks");

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

const tryAddStation = (inputValue: string) => {
  const { getByTestId } = render(<StationManagementPage />);

  act(() => {
    fireEvent.change(getByTestId("station-name-input"), { target: { value: inputValue } });
  });

  act(() => {
    fireEvent.click(getByTestId("station-add-button"));
  });
};

beforeEach(() => {
  cleanup();
  jest.spyOn(window, "alert").mockImplementation(() => true);
  initAxiosMock();
});

describe("지하철 역", () => {
  describe("지하철 역 조회 기능", () => {
    describe("역 데이터가 이미 존재하는 경우", () => {
      it("사용자는 등록되어 있는 전체 지하철 역 목록을 조회할 수 있다", () => {
        mockRedux();

        const { getByText } = render(<StationManagementPage />);
        const [lastListItem] = initialState.station.items.slice(-1);

        getByText(lastListItem.name);
      });
    });
  });

  describe("지하철 역 추가 기능", () => {
    describe("역 이름이 2자 이상 20자 이하의 한글 또는 숫자를 포함하는 경우", () => {
      it("사용자는 지하철 역을 추가할 수 있다", async () => {
        const store = mockRedux();

        tryAddStation("테스트역");

        waitFor(() => {
          const actions = store.getActions();
          expect(actions.length).toBe(4);

          const [action1, action2, action3, action4] = actions;
          expect(action1).toMatchObject({ type: "[STATION] ADD/pending" });
          expect(action2).toMatchObject({ type: "[STATION] ADD/fulfilled" });
          expect(action3).toMatchObject({ type: "[STATION] LOAD/pending" });
          expect(action4).toMatchObject({ type: "[STATION] LOAD/fulfilled" });
        });
      });
    });

    describe("역 이름이 2자 미만인 경우 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {
        const store = mockRedux();

        tryAddStation("테");

        waitFor(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
      });
    });

    describe("역 이름이 20자보다 긴 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {
        const store = mockRedux();

        tryAddStation("테스트테스트테스트테스트테스트테스트테스트테스트테스트");

        waitFor(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
      });
    });

    describe("역 이름이 특수문자를 포함하는 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {
        const store = mockRedux();

        tryAddStation("!!!!!????");

        waitFor(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
      });
    });
  });
  describe("지하철 역 삭제 기능", () => {
    describe("삭제하려는 역이 노선에 등록되어 있는 역이 아닌 경우", () => {
      it("사용자는 지하철 역을 삭제할 수 있다", async () => {
        const store = mockRedux();
        const { getAllByText } = render(<StationManagementPage />);

        act(() => {
          const [firstDeleteButton] = getAllByText("삭제");
          fireEvent.click(firstDeleteButton);
        });

        waitFor(() => {
          const actions = store.getActions();
          expect(actions.length).toBe(4);

          const [action1, action2, action3, action4] = actions;
          expect(action1).toMatchObject({ type: "[STATION] DELETE/pending" });
          expect(action2).toMatchObject({ type: "[STATION] DELETE/fulfilled" });
          expect(action3).toMatchObject({ type: "[STATION] LOAD/pending" });
          expect(action4).toMatchObject({ type: "[STATION] LOAD/fulfilled" });
        });
      });
    });

    describe("삭제하려는 역이 노선에 등록되어 있는 역인 경우", () => {
      it("사용자는 지하철 역을 삭제할 수 없다", async () => {
        const mockedAxiosDelete = axios.delete as jest.MockedFunction<typeof axios.delete>;
        mockedAxiosDelete.mockImplementation(async () => {
          throw Error("에러!");
        });

        const store = mockRedux();
        const { getAllByText } = render(<StationManagementPage />);

        act(() => {
          const [firstDeleteButton] = getAllByText("삭제");
          fireEvent.click(firstDeleteButton);
        });

        waitFor(() => {
          const actions = store.getActions();
          expect(actions.length).toBe(4);

          const [action1, action2, action3, action4] = actions;
          expect(action1).toMatchObject({ type: "[STATION] DELETE/pending" });
          expect(action2).toMatchObject({ type: "[STATION] DELETE/rejected" });
          expect(action3).toMatchObject({ type: "[STATION] LOAD/pending" });
          expect(action4).toMatchObject({ type: "[STATION] LOAD/fulfilled" });
        });
      });
    });
  });
});
