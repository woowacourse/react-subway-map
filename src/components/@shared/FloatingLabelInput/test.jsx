/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FloatingLabelInput from ".";

describe("FloatingLabelInput", () => {
  test("라벨과 인풋으로 구성되어 있다.", () => {
    const props = {
      id: "id",
      type: "text",
      label: "label",
      value: "",
      onChange: jest.fn(),
    };

    render(<FloatingLabelInput {...props} />);

    expect(screen.getByText("label")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
