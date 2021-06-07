import styled from 'styled-components';

export const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.color.border.primary};
  border-radius: 5px;
  font-size: 18px;
  width: 100%;
  background: none;
  padding: 0.6em;
  color: inherit;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
  appearance: none;

  option[value=''][disabled] {
    display: none;
  }

  &:focus {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.color.border.primary};
  }
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

export const Label = styled.label`
  position: relative;
  display: block;
`;

export const Arrow = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  display: inline-flex;
  align-items: center;
  pointer-events: none;

  svg {
    height: 20px;
    padding: 0 1em;
  }
`;
