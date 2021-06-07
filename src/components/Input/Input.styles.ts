import styled from 'styled-components';

interface InputIProps {
  hasIcon: boolean;
  isError: boolean;
}

export const Label = styled.label`
  position: relative;
  display: block;
  margin-bottom: 20px;
`;

export const LabelText = styled.span`
  position: absolute;
  top: -12px;
  left: 12px;
  background-color: white;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text.label};
`;

export const Input = styled.input<InputIProps>`
  border: 1px solid
    ${({ theme, isError }) => (isError ? theme.color.border.error : theme.color.border.primary)};
  border-radius: 5px;
  font-size: 18px;
  width: 100%;
  background: none;
  padding: 0.6em;
  padding-left: ${({ hasIcon }) => (hasIcon ? '50px' : '0.6em')};
  color: inherit;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    box-shadow: inset 0 0 0 1px
      ${({ theme, isError }) => (isError ? theme.color.border.error : theme.color.border.primary)};
  }
`;

export const Icon = styled.div`
  position: absolute;
  left: 18px;
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Message = styled.p`
  position: absolute;

  color: ${({ theme }) => theme.color.text.error};
  font-size: 14px;
  letter-spacing: -1px;
  margin: 0;
  margin-left: 12px;
`;
