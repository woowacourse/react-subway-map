import styled from "styled-components";

import { COLOR } from "../../constants/color";

interface ButtonBlockProps {
  kind?: "rect" | "eclipse";
  size?: "sm" | "md" | "block";
  buttonTheme?: "primary" | "gray" | "white";
}

const BUTTON_KIND = {
  rect: {
    boxShadow: "1px 2px 3px rgba(0, 0, 0, 0.2)",
    borderRadius: "0.1875rem",
  },
  eclipse: {
    borderRadius: "0.9375rem",
  },
};

const BUTTON_SIZE = {
  sm: {
    width: "3.125rem",
    height: "1.625rem",
  },
  md: {
    width: "6.125rem",
    height: "2.375rem",
  },
  block: {
    width: "100%",
    height: "2.375rem",
  },
};

const BUTTON_THEME = {
  primary: {
    backgroundColor: COLOR.CYAN_300,
    color: COLOR.GRAY_900,
  },
  gray: {
    backgroundColor: COLOR.GRAY_200,
    color: COLOR.GRAY_500,
  },
  white: {
    backgroundColor: COLOR.WHITE,
    color: COLOR.BLUE_500,
  },
};

const ButtonBlock = styled.button<ButtonBlockProps>(
  ({ kind = "eclipse", size = "md", buttonTheme = "primary" }) => ({
    ...BUTTON_KIND[kind],
    ...BUTTON_SIZE[size],
    ...BUTTON_THEME[buttonTheme],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })
);

export type { ButtonBlockProps };
export { ButtonBlock };
