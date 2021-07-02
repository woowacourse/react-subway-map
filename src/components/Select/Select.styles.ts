import styled from "styled-components";

import { COLOR } from "../../constants/color";

interface SelectBlockProps {
  selectSize?: "md" | "block";
  backgroundColor?: string;
}

const SELECT_SIZE = {
  md: {
    width: "29.75rem",
  },
  block: {
    width: "100%",
  },
};

const SelectBlock = styled.select<SelectBlockProps>`
  font-size: 1rem;
  font-weight: 400;
  ${({ selectSize = "md", backgroundColor = COLOR.GRAY_200 }) => `
    width: ${SELECT_SIZE[selectSize]?.width};
    background-color:${backgroundColor};
  `}
  padding: 0.75rem 1.25rem;
  border: none;
  outline: none;
  border-radius: 2rem;
  -webkit-appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    radial-gradient(${COLOR.WHITE} 0%, transparent 0%);
  background-position: calc(100% - 30px) calc(1rem + 4px),
    calc(100% - 25px) calc(1rem + 4px), calc(100% - 0.5rem) 0.5rem;
  background-size: 5px 5px, 5px 5px, 1.5rem 1.5rem;
  background-repeat: no-repeat;
`;

export type { SelectBlockProps };
export { SelectBlock };
