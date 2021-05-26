import { Properties } from 'csstype';
import styled from 'styled-components';
import PALETTE from '../../constants/palette';
import { MdCheck } from 'react-icons/md';

interface ContainerProps {
  themeColor?: string;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-row-gap: 1rem;
  background-color: ${PALETTE.WHITE};
  border: 3px solid ${({ themeColor }) => (themeColor ? themeColor : PALETTE.BAEMIN)};
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 0.8rem;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1), -3px -3px 3px rgba(255, 255, 255, 0.2);

  h5 {
    font-size: 1rem;
    font-weight: 700;
    text-shadow: 1px 1px 0px 1px ${PALETTE.GRAY_700};
    color: ${({ themeColor }) => (themeColor ? themeColor : PALETTE.BAEMIN)};
  }

  input {
    margin-right: 0.4rem;
    appearance: none;
    cursor: pointer;
    font-size: 1rem;
    height: 1.2rem;
    position: relative;
    display: flex;
    align-items: center;

    :before {
      content: '';
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      border: 1px solid black;
      border-radius: 2px;
    }

    :checked:after {
      position: absolute;
      left: 0.15rem;
      bottom: 0.15rem;
      content: '✔︎';
      color: ${({ themeColor }) => (themeColor ? themeColor : PALETTE.BAEMIN)};
    }
  }

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

export { Container };
