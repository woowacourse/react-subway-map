import styled from 'styled-components';

interface InputIProps {
  hasIcon: boolean;
}

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input<InputIProps>`
  border: 1px solid ${({ theme }) => theme.color.border.primary};
  border-radius: 5px;
  font-size: 18px;
  width: 100%;
  background: none;
  padding: 0.6em;
  padding-left: ${({ hasIcon }) => (hasIcon ? '45px' : '0.6em')};
  color: inherit;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.color.border.primary};
  }
`;

export const Icon = styled.div`
  position: absolute;
  left: 12px;
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
`;
