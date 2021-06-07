import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useAuth } from "../../pages/Login/hooks";
import Header from ".";

jest.mock("../../pages/Login/hooks");

describe("Header", () => {
  test("로그인이 안되어 있는 경우 로그인 링크가 표시된다.", () => {
    useAuth.mockReturnValue(false);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByRole("link", { name: "로그인" })).toBeInTheDocument();
  });

  test("로그인이 되어 있는 경우 로그아웃 링크가 표시된다.", () => {
    useAuth.mockReturnValue(true);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByRole("link", { name: "로그아웃" })).toBeInTheDocument();
  });
});
