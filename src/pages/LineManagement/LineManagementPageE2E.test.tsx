import { createMemoryHistory } from "history";
import { render, fireEvent, act, waitFor, cleanup, screen, RenderResult } from "@testing-library/react";
import axios from "axios";

import LineManagementPage from "./LineManagementPage";
import initialState from "../../fixtures/redux";
import { TEST_ID } from "../../@test/testId";
import { TEST_LINE } from "../../fixtures/line";
import { Line } from "../../@types/types";
import { MockedApp } from "../../@test/mockApp";
import { lines } from "../../fixtures/request";

jest.mock("axios");

interface LineInfo {
  LINE_NAME: string;
  UP_STATION_ID: number;
  DOWN_STATION_ID: number;
  DISTANCE: number;
}

const initAxiosMock = () => {
  const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
  mockedAxiosGet.mockImplementation(async () => ({ data: lines }));
  const mockedAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
  mockedAxiosPost.mockImplementation(async () => {});
  const mockedAxiosPut = axios.put as jest.MockedFunction<typeof axios.put>;
  mockedAxiosPut.mockImplementation(async () => {});
  const mockedAxiosDelete = axios.delete as jest.MockedFunction<typeof axios.delete>;
  mockedAxiosDelete.mockImplementation(async () => {});
};

const setAxiosGet = (requestedData: Line[]) => {
  const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
  mockedAxiosGet.mockImplementation(async () => ({ data: requestedData }));
};

const renderLineMagangementPage = () => {
  const history = createMemoryHistory();
  history.push("/line");

  const utils = render(
    <>
      <MockedApp history={history} />
      <div id="modal"></div>
    </>
  );

  return utils;
};

const tryAddLine = async (lineInfo: LineInfo, utils: RenderResult) => {
  const LineAddModalOpenButton = utils.getByTestId(TEST_ID.SECTION_MODAL_OPEN_BUTTON);

  act(() => {
    fireEvent.click(LineAddModalOpenButton);
  });

  const LineNameInput = await utils.findByTestId(TEST_ID.LINE_NAME_INPUT);
  const UpStationSelect = await utils.findByTestId(TEST_ID.LINE_UP_STATION_SELECT);
  const DownStationSelect = await utils.findByTestId(TEST_ID.LINE_DOWN_STATION_SELECT);
  const DistanceInput = await utils.findByTestId(TEST_ID.LINE_DISTANCE_INPUT);
  const LineAddButton = await utils.findByPlaceholderText(TEST_ID.LINE_ADD_BUTTON);

  act(() => {
    fireEvent.change(LineNameInput, { target: { value: lineInfo.LINE_NAME } });
    fireEvent.select(UpStationSelect, { target: { value: lineInfo.UP_STATION_ID } });
    fireEvent.select(DownStationSelect, { target: { value: lineInfo.DOWN_STATION_ID } });
    fireEvent.change(DistanceInput, { target: { value: lineInfo.DISTANCE } });
  });

  act(() => {
    fireEvent.click(LineAddButton);
  });
};

const tryDeleteLine = async (id: Line["id"], utils: RenderResult) => {
  const TargetLineItem = await utils.findByTestId(`line-${id}`);
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
      it.only("사용자는 노선의 정보를 조회할 수 있다", async () => {
        const utils = renderLineMagangementPage();

        const [lastLine] = initialState.line.items.slice(-1);

        const lastLineItem = await utils.findByText("wesgjlajgklsdajfklsdja");

        expect(lastLineItem);
      });
    });
  });

  describe("지하철 노선 추가 기능", () => {
    describe("입력이 모두 유효하다면", () => {
      it("사용자는 노선을 추가할 수 있다", () => {
        const utils = renderLineMagangementPage();
        tryAddLine(TEST_LINE, utils);

        waitFor(() => {});
      });
    });

    describe("노선 이름이 2자 미만인 경우", () => {
      it("사용자는 노선을 추가할 수 없다", () => {
        const utils = renderLineMagangementPage();
        tryAddLine(
          {
            ...TEST_LINE,
            LINE_NAME: "테",
          },
          utils
        );
      });
    });
    describe("노선 이름이 10자보다 많은 경우", () => {
      it("사용자는 노선을 추가할 수 없다", () => {
        const utils = renderLineMagangementPage();

        tryAddLine(
          {
            ...TEST_LINE,
            LINE_NAME: "테스트테스트테스트테스트",
          },
          utils
        );

        waitFor(() => {});
      });
    });
    describe("중복된 노선 이름이 있는 경우", () => {
      it("사용자는 노선을 추가할 수 없다", () => {
        const [firstLine] = initialState.line.items;
        const utils = renderLineMagangementPage();

        tryAddLine(
          {
            ...TEST_LINE,
            LINE_NAME: firstLine.name,
          },
          utils
        );

        waitFor(() => {});
      });
    });
  });

  describe("지하철 노선 삭제 기능", () => {
    describe("노선 목록에 노선이 하나라도 있다면", () => {
      it("사용자는 노선을 삭제할 수 있다", () => {
        const [lastLine] = initialState.line.items.slice(-1);
        const utils = renderLineMagangementPage();

        tryDeleteLine(lastLine.id, utils);

        waitFor(() => {});
      });
    });
  });
});
