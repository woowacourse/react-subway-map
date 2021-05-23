import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

const Button = styled.button`
  position: relative;
  white-space: nowrap;
  background-color: ${PALETTE.MAIN};
  background-color: ${(props) => props?.disabled && `rgba(0, 0, 0, 0.2)`};
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
  height: 3rem;
  box-shadow: 0 0.125rem 0.25rem grey;
  font-size: 1rem;
  font-weight: 600;
  color: ${PALETTE.FONT};

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active::after {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default Button;
