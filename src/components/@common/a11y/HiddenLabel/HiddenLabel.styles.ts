import styled from 'styled-components';

export const HiddenLabelText = styled.div`
  opacity: 0;
  position: absolute;
`;

export const StyledHiddenLabel = styled.label`
  & > * {
    width: 100%;
  }
`;
