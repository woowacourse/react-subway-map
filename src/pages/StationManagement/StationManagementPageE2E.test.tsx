import { render, fireEvent, act, cleanup, RenderResult, screen } from "@testing-library/react";
import { MemoryHistory, createMemoryHistory } from "history";
import { MockedApp } from "../../@test/mockApp";
import { requestAuth } from "../../apis/user";
import { requestStation } from "../../apis/station";
import { stations } from "../../fixtures/request";
import { AxiosResponse } from "axios";

jest.mock("../../apis/station");
jest.mock("../../apis/user");

const renderStationManagementPage = (history?: MemoryHistory) => {
  const defaultHistory = createMemoryHistory();
  defaultHistory.push("/station");

  const mockedGetAllStations = requestStation.getAllStation as jest.MockedFunction<typeof requestStation.getAllStation>;
  mockedGetAllStations.mockResolvedValue(stations);

  const requestGetUserInfo = requestAuth.getUserInfo as jest.MockedFunction<typeof requestAuth.getUserInfo>;
  requestGetUserInfo.mockResolvedValue(Promise.resolve({}) as Promise<AxiosResponse<any>>);

  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => "testToken"),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });

  return render(
    <>
      <MockedApp history={history ? history : defaultHistory} />
      <div id="modal"></div>
    </>
  );
};

const tryAddStation = (inputValue: string, utils: RenderResult) => {
  act(() => {
    fireEvent.change(utils.getByTestId("station-name-input"), { target: { value: inputValue } });
  });

  act(() => {
    fireEvent.click(utils.getByTestId("station-add-button"));
  });
};

beforeEach(() => {
  cleanup();
  jest.spyOn(window, "alert").mockImplementation(() => true);
});

describe("지하철 역", () => {
  describe("지하철 역 조회 기능", () => {
    describe("역 데이터가 이미 존재하는 경우", () => {
      it("사용자는 등록되어 있는 전체 지하철 역 목록을 조회할 수 있다", async () => {
        const utils = renderStationManagementPage();

        const station1 = await screen.findByText("지하철역 1");

        expect(station1);
      });
    });
  });

  describe("지하철 역 추가 기능", () => {
    describe("역 이름이 2자 이상 20자 이하의 한글 또는 숫자를 포함하는 경우", () => {
      it("사용자는 지하철 역을 추가할 수 있다", async () => {});
    });

    describe("역 이름이 2자 미만인 경우 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {});
    });

    describe("역 이름이 20자보다 긴 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {});
    });

    describe("역 이름이 특수문자를 포함하는 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {});
    });
  });
  describe("지하철 역 삭제 기능", () => {
    describe("삭제하려는 역이 노선에 등록되어 있는 역이 아닌 경우", () => {
      it("사용자는 지하철 역을 삭제할 수 있다", async () => {});
    });

    describe("삭제하려는 역이 노선에 등록되어 있는 역인 경우", () => {
      it("사용자는 지하철 역을 삭제할 수 없다", async () => {});
    });
  });
});
