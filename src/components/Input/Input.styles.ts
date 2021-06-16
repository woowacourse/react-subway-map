import styled from "styled-components";

import { COLOR } from "../../constants";

const InputBlock = styled.input`
  font-size: 1rem;
  font-weight: 400;
  line-height: inherit;
  width: 100%;
  height: auto;
  padding: 0.75rem 1.25rem;
  border: none;
  outline: none;
  border-radius: 2rem;
  background-color: ${COLOR.GRAY_50};
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: ${COLOR.RED_500};
  padding-left: 1rem;
`;

export { InputBlock, ErrorMessage };
