import styled from "styled-components";

export interface InputStylesProps {}

export const InputBlock = styled.input`
  font-size: 1rem;
  font-weight: 400;
  line-height: inherit;
  width: 100%;
  height: auto;
  padding: 0.75rem 1.25rem;
  border: none;
  outline: none;
  border-radius: 2rem;
  background-color: #f1f5f9;
`;

export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.DANGER_TEXT_COLOR};
  padding-left: 1rem;
`;
