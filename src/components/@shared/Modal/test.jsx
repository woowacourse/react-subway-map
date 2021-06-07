import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Modal from ".";

describe("Modal", () => {
  test("Modal의 props 중 isOpen이 true일 때 모달이 화면에 표시된다.", () => {
    render(
      <Modal isOpen close={jest.fn()}>
        hello dongdong
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("Modal의 props 중 isOpen이 false일 때 모달이 화면에 표시되지 않는다.", () => {
    render(
      <Modal isOpen={false} close={jest.fn()}>
        hello dongdong
      </Modal>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
