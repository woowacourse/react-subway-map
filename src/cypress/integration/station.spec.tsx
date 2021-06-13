import { TEST_ID } from "../../@test/testId";
import { stations } from "../../fixtures/request";

// 모든 리스트 아이템에 testid 를 주자
const tryAddStation = (stationName: string) => {
  cy.findByTestId(TEST_ID.STATION_NAME_INPUT).type(stationName);
  cy.findByTestId(TEST_ID.STATION_ADD_BUTTON).click();
};

const tryDeleteStation = (stationName: string) => {
  cy.get(`[data-testid="station-item-${stationName}"] [role="delete"]`).then(($element) => {
    cy.wrap($element).click();
  });
};

const stationName = "혜화역";

describe("역 관리", () => {
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
    }).as("getStation");

    cy.intercept("POST", "/stations", {
      statusCode: 201,
      body: {
        id: 1,
        name: "지하철역",
      },
    }).as("addStation");

    cy.intercept("DELETE", "/stations/*", {
      statusCode: 204,
    }).as("deleteStation");

    cy.visit("/");

    cy.findByTestId(TEST_ID.STATION_PAGE, { timeout: 2000 }).should("be.visible");
  });

  describe("역 조회", () => {
    it("페이지에 접근하는 즉시 지하철역 목록 조회 요청을 보낸다", () => {
      cy.get("@getStation").should("exist");
    });
  });

  describe("역 추가", () => {
    it("모든 유효성 검사를 통과한다면 역을 추가할 수 있다.", () => {
      tryAddStation(stationName);

      cy.get("@addStation").should("exist");
    });

    it("역 이름이 2자 미만인 경우 경우 역을 추가할 수 없다.", () => {
      tryAddStation("테");

      cy.get("@addStation").should("not.exist");
    });

    it("역 이름이 2자 미만인 경우 경우 역을 추가할 수 없다.", () => {
      tryAddStation("테");

      cy.get("@addStation").should("not.exist");
    });

    it("역 이름이 20자보다 긴 경우 경우 역을 추가할 수 없다.", () => {
      tryAddStation("테스트테스트테스트테스트테스트테스트테스트테스트테스트");

      cy.get("@addStation").should("not.exist");
    });

    it("역 이름이 특수문자를 포함하는 경우 역을 추가할 수 없다.", () => {
      tryAddStation("!!!!!????");

      cy.get("@addStation").should("not.exist");
    });
  });

  describe("역 삭제", () => {
    it("노선에 속하지 않은 역은 삭제할 수 있다.", () => {
      tryDeleteStation(stationName);

      cy.get("@deleteStation").should("exist");
    });
    it("노선에 이미 속해 있는 역은 삭제할 수 없다.", () => {
      cy.intercept("DELETE", "/stations/*", {
        statusCode: 400,
        body: {
          message: "구간에 존재하는 지하 역을 삭제할 수 없습니다",
        },
      }).as("deleteStation");

      tryDeleteStation(stationName);

      cy.get("@deleteStation");

      cy.findByText(stationName).should("exist");
    });
  });
});
