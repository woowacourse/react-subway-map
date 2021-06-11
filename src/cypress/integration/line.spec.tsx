import { TEST_ID } from "../../@test/testId";
import { Line } from "../../@types/types";
import { PAGE_PATH } from "../../constants/route";
import { lines, stations } from "../../fixtures/request";

interface LineInfo {
  color: string;
  name: string;
  upStationId: string;
  downStationId: string;
  distance: string;
}

const tryAddLine = (lineInfo: LineInfo) => {
  cy.findByTestId(TEST_ID.LINE_MODAL_OPEN_BUTTON).click();

  cy.findByTestId(TEST_ID.LINE_NAME_INPUT).type(lineInfo.name);
  cy.findByTestId(TEST_ID.LINE_UP_STATION_SELECT).select(lineInfo.upStationId);
  cy.findByTestId(TEST_ID.LINE_DOWN_STATION_SELECT).select(lineInfo.downStationId);
  cy.findByTestId(TEST_ID.LINE_DISTANCE_INPUT).type(lineInfo.distance);

  cy.findByTestId(TEST_ID.LINE_ADD_BUTTON).click();
};

const tryDeleteLine = (lineName: string) => {
  cy.get(`[data-testid="line-item-${lineName}"] [role="delete"]`).then(($element) => {
    cy.wrap($element).click();
  });
};

const setLineGet = () => {};

const lineInput = {
  color: "bg-blue-100",
  name: "추가한노선",
  upStationId: "1",
  downStationId: "2",
  distance: "10",
};

const newLine: Line = {
  id: 3,
  name: "추가한노선",
  color: "bg-green-300",
  stations: [
    {
      id: 1,
      name: "강남역",
    },
    {
      id: 4,
      name: "동대문역",
    },
  ],
  sections: [
    {
      upStation: {
        id: 3,
        name: "강남역",
      },
      downStation: {
        id: 4,
        name: "광교역",
      },
      distance: 10,
    },
  ],
};

describe("노선 관리", () => {
  beforeEach(() => {
    cy.clearLocalStorage().then(() => {
      localStorage.setItem("accessToken", "testToken");
    });

    cy.intercept("GET", "/members/me", {
      statusCode: 200,
      body: {
        id: 1,
        email: "email@email.com",
        age: 20,
      },
    }).as("checkAccessToken");

    cy.intercept("GET", "/stations", {
      statusCode: 200,
      body: stations,
    }).as("getLines");

    cy.intercept("GET", "/lines", {
      statusCode: 200,
      body: lines,
    }).as("getLines");

    cy.intercept("POST", "/lines", {
      statusCode: 201,
      body: {
        name: "테스트노선",
        color: "bg-red-600",
        upStationId: 1,
        downStationId: 2,
        distance: 10,
      },
    }).as("addLine");

    cy.intercept("DELETE", "/lines/*", {
      statusCode: 204,
    }).as("deleteLine");

    cy.visit("/");

    cy.findByTestId(`navigation-link-${PAGE_PATH.LINE_MANAGEMENT}`).click();

    cy.findByTestId(TEST_ID.LINE_PAGE, { timeout: 2000 }).should("be.visible");
  });

  describe("노선 조회", () => {
    it("페이지에 접근하는 즉시 지하철 노선 목록 조회 요청을 보낸다", () => {
      cy.get("@getLines").should("exist");
    });
  });

  describe("노선 추가", () => {
    it("모든 유효성 검사를 통과한다면 노선을 추가할 수 있다.", () => {
      const newLines = [...lines];
      newLines.push(newLine);

      cy.intercept("POST", "/lines", {
        statusCode: 201,
        body: newLine,
      }).as("addLine");

      cy.intercept("GET", "/lines", {
        statusCode: 200,
        body: newLines,
      }).as("getLines");

      tryAddLine(lineInput);

      cy.get("@addLine").should("exist");

      cy.findAllByRole("line-item").should("have.length", lines.length + 1);
    });

    it("노선 이름이 2자 미만인 경우 노선을 추가할 수 없다.", () => {
      tryAddLine({
        ...lineInput,
        name: "테",
      });

      cy.get("@addLine").should("not.exist");

      cy.findAllByRole("line-item").should("have.length", lines.length);
    });

    it("노선 이름이 10자보다 많은 경우 노선을 추가할 수 없다.", () => {
      tryAddLine({
        ...lineInput,
        name: "테스트테스트테스트테스트",
      });

      cy.get("@addLine").should("not.exist");
      cy.get("@getLines").should("exist");

      cy.findAllByRole("line-item").should("have.length", lines.length);
    });

    it("중복된 노선 이름이 있는 경우 노선을 추가할 수 없다.", () => {
      cy.intercept("POST", "/lines", {
        statusCode: 400,
        body: {
          message: "중복된 지하철 노선입니다",
        },
      }).as("addLine");

      tryAddLine({
        ...lineInput,
        name: "2호선",
      });

      cy.findAllByRole("line-item").should("have.length", lines.length);
    });
  });

  describe("노선 삭제", () => {
    it.only("삭제할 노선이 있다면, 노선을 삭제할 수 있다", () => {
      cy.intercept("GET", "/lines", {
        statusCode: 200,
        body: lines.filter((line) => line.name !== "신분당선"),
      }).as("getLines");

      tryDeleteLine("신분당선");

      cy.get("@deleteLine").should("exist");

      cy.findAllByRole("line-item").should("have.length", lines.length - 1);
    });
  });
});
