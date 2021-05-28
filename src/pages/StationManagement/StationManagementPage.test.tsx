import { render, fireEvent, act } from "@testing-library/react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { action } from "../../modules/station";

import StationManagementPage from "./StationManagementPage";
import initialState from "../../fixtures/redux";

jest.mock("../../hooks");

// TODO : 지하철 역 정보가 이미 들어가 있다는 것을 어떻게 명시할지 고민해보기
// TODO : 폼 제출시 focus out 이 안되는 상황에서의 예외처리가 되도록 코드 고치기
// TODO : 단순 dispatch 여부가 아니라 어떤 action 이 발생하는지를 테스트

const dispatch = jest.fn();

const initReduxMock = () => {
  const mockedUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
  mockedUseAppSelector.mockImplementation((selector) => selector(initialState));

  const mockedUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
  mockedUseAppDispatch.mockImplementation(() => dispatch);
};

describe("지하철 역", () => {
  describe("지하철 역 조회 기능", () => {
    beforeEach(initReduxMock);

    describe("역 데이터가 이미 존재하는 경우", () => {
      it("사용자는 등록되어 있는 전체 지하철 역 목록을 조회할 수 있다", () => {
        const { getByText } = render(<StationManagementPage />);
        const [lastListItem] = initialState.station.items.slice(-1);

        getByText(lastListItem.name);
      });
    });
  });

  describe("지하철 역 추가 기능", () => {
    beforeEach(initReduxMock);

    describe("역 이름이 2자 이상 20자 이하의 한글 또는 숫자를 포함하는 경우", () => {
      it("사용자는 지하철 역을 추가할 수 있다", async () => {
        const { getByTestId } = render(<StationManagementPage />);

        await act(async () => {
          fireEvent.change(getByTestId("station-name-input"), { target: { value: "테스트역" } });
          fireEvent.click(getByTestId("station-add-button"));
        });

        expect(dispatch).toBeCalled();
      });
    });

    describe("역 이름이 2자 미만인 경우 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {
        const { getByTestId } = render(<StationManagementPage />);

        await act(async () => {
          fireEvent.change(getByTestId("station-name-input"), { target: { value: "테" } });
          fireEvent.click(getByTestId("station-add-button"));
        });

        expect(dispatch).not.toBeCalled();
      });
    });

    describe("역 이름이 20자보다 긴 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {
        const { getByTestId } = render(<StationManagementPage />);

        await act(async () => {
          fireEvent.change(getByTestId("station-name-input"), {
            target: { value: "테스트테스트테스트테스트테스트테스트테스트테스트테스트" },
          });
          fireEvent.click(getByTestId("station-add-button"));
        });

        expect(dispatch).not.toBeCalled();
      });
    });

    describe("역 이름이 특수문자를 포함하는 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {
        const { getByTestId } = render(<StationManagementPage />);

        await act(async () => {
          fireEvent.change(getByTestId("station-name-input"), {
            target: { value: "???!!!" },
          });
          fireEvent.click(getByTestId("station-add-button"));
        });

        expect(dispatch).not.toBeCalled();
      });
    });

    describe("중복된 역 이름이 있는 경우", () => {});
  });

  describe("지하철 역 삭제 기능", () => {
    beforeEach(initReduxMock);

    describe("삭제하려는 역이 노선에 등록되어 있는 역이 아닌 경우", () => {
      it("사용자는 지하철 역을 삭제할 수 있다", async () => {
        const { getAllByText } = render(<StationManagementPage />);

        await act(async () => {
          const [firstDeleteButton] = getAllByText("삭제");
          fireEvent.click(firstDeleteButton);
        });

        expect(dispatch).toBeCalled();
      });
    });

    describe("삭제하려는 역이 노선에 등록되어 있는 역인 경우", () => {
      it("사용자는 지하철 역을 삭제할 수 있다", async () => {
        const { getAllByText } = render(<StationManagementPage />);

        await act(async () => {
          const [firstDeleteButton] = getAllByText("삭제");
          fireEvent.click(firstDeleteButton);
        });

        expect(dispatch).toBeCalled();
      });
    });
  });
});
