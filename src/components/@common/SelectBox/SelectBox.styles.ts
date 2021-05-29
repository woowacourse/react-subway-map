import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

export const Label = styled.label`
  display: block;
  position: relative;

  width: 100%;
  height: 3rem;

  &::after {
    content: '▾';
    font-size: 1.25rem;
    position: absolute;
    top: 0.875rem;
    right: 1rem;
  }
`;

const StyledSelectBox = styled.select`
  position: relative;
  appearance: none;
  outline: none;

  width: 100%;
  height: 100%;

  padding: 0 0.75rem;
  border-radius: 0.5rem;

  border: 1px solid ${PALETTE.GRAY_500};

  font-size: 1.125rem;
`;

export const LabelText = styled.span`
  display: block;
  position: absolute;
  top: -0.35rem;
  left: 0.625rem;
  background-color: white;
  color: ${PALETTE.GRAY_500};
  font-weight: 500;
  width: max-content;
  font-size: 0.75rem;
  padding: 0 0.25rem;
`;

export default StyledSelectBox;
