import { TEST_ID } from "../../@test/testId";
import { PAGE_PATH } from "../../constants/route";
import { lines, stations } from "../../fixtures/request";

interface SectionInfo {
  upStationId: string;
  downStationId: string;
  distance: string;
}

const tryAddSection = (sectionInfo: SectionInfo) => {
  cy.findByTestId(TEST_ID.SECTION_MODAL_OPEN_BUTTON).click();

  cy.findByTestId(TEST_ID.SECTION_UP_STATION_SELECT).select(sectionInfo.upStationId);
  cy.findByTestId(TEST_ID.SECTION_DOWN_STATION_SELECT).select(sectionInfo.downStationId);
  cy.findByTestId(TEST_ID.SECTION_DISTANCE_INPUT).type(sectionInfo.distance);

  cy.findByTestId(TEST_ID.SECTION_ADD_BUTTON).click();
};

const tryDeleteSection = (sectionStationName: string) => {
  cy.get(`[data-testid="section-item-${sectionStationName}"] [role="delete"]`).then(($element) => {
    cy.wrap($element).click();
  });
};

const section = {
  upStationId: "1",
  downStationId: "4",
  distance: "5",
};

describe("구간 관리", () => {
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

    cy.intercept("POST", "/lines/*/sections ", {
      statusCode: 201,
      body: {
        name: "테스트노선",
        color: "bg-red-600",
        upStationId: 1,
        downStationId: 2,
        distance: 10,
      },
    }).as("addSection");

    cy.intercept("DELETE", "/lines/*/sections?stationId=*", {
      statusCode: 204,
    }).as("deleteSection");

    cy.visit("/");

    cy.findByTestId(`navigation-link-${PAGE_PATH.SECTION_MANAGEMENT}`).click();

    cy.findByTestId(TEST_ID.SECTION_PAGE, { timeout: 2000 }).should("be.visible");
  });

  describe("구간 조회", () => {
    it("페이지에 접근하는 즉시 지하철 노선 목록 조회 요청을 보내서 구간 정보를 불러온다", () => {
      cy.get("@getLines").should("exist");
    });
  });

  describe("구간 추가", () => {
    it("모든 유효성 검사를 통과한다면 구간을 추가할 수 있다.", () => {
      const newLines = [...lines];
      const [firstLine] = newLines;

      firstLine.stations.push({
        id: 4,
        name: "동대문역",
      });
      firstLine.sections.push({
        upStation: {
          id: 1,
          name: "강남역",
        },
        downStation: {
          id: 4,
          name: "동대문역",
        },
        distance: 5,
      });

      cy.intercept("GET", "/lines", {
        statusCode: 200,
        body: newLines,
      }).as("getLines");

      tryAddSection(section);

      cy.get("@addSection").should("exist");

      cy.findAllByRole("section-item").should("have.length", firstLine.stations.length);
    });

    it("이미 등록한 구간의 상행선, 하행선은 같은 노선의 역을 선택할 수 없다", () => {
      cy.findByTestId(TEST_ID.SECTION_MODAL_OPEN_BUTTON).click();

      cy.findByTestId(TEST_ID.SECTION_UP_STATION_SELECT).select("1");
      cy.get(`option[innerText="강남역"]`).should("not.exist");
      cy.get(`option[innerText="광교역"]`).should("not.exist");
    });

    it("기존 구간 거리보다 큰 거리의 구간을 끼워넣을 수 없다.", () => {
      const [firstLine] = lines;

      tryAddSection({ upStationId: "1", downStationId: "3", distance: "100" });

      cy.get("@addSection").should("not.exist");

      cy.findAllByRole("section-item").should("have.length", firstLine.stations.length);
    });
  });

  describe("구간 삭제", () => {
    it("삭제할 구간이 있다면, 구간을 삭제할 수 있다", () => {
      const newLines = [...lines];
      const [firstLine] = newLines;
      firstLine.sections = firstLine.sections.filter((section) => section.downStation.name !== "충무로역");
      firstLine.stations = firstLine.stations.filter((station) => station.name !== "충무로역");

      cy.intercept("GET", "/lines", {
        statusCode: 200,
        body: newLines,
      }).as("getLines");

      tryDeleteSection("충무로역");

      cy.get("@deleteSection").should("exist");

      cy.findAllByRole("section-item").should("have.length", firstLine.stations.length);
    });
  });
});
