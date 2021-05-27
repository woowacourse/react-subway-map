import styled from 'styled-components';

import PALETTE from '../../constants/palette';
import { Container as Box } from '../../components/shared/Box/Box.style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 0.05rem;
  }
  min-height: 70vh;
`;

const Icon = styled.span`
  color: ${PALETTE.GRAY_500};
  margin-right: 0.5rem;

  * {
    height: 100%;
  }
`;

const TitleBox = styled<any>(Box)`
  & button[type='button'] {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    right: 1rem;
    bottom: -1.5rem;

    svg {
      transition: transform 0.8s ease;
      transform-origin: center;
      transform: rotate(${({ isOpen }) => (isOpen ? '135deg' : '0')});
    }
  }

  p {
    text-align: center;
    font-size: 0.75rem;
    color: ${PALETTE.GRAY_500};
    margin-bottom: 1.5rem;
  }
`;

const FormBox = styled<any>(Box)`
  transition: all 0.8s ease;
  overflow: hidden;
  ${({ isOpen }) =>
    isOpen
      ? 'max-height: 400px; form {opacity: 1;}'
      : 'max-height: 0; padding-top: 0; padding-bottom: 0; form {opacity: 0;}'}
  position: relative;
  margin: 0.05rem 0;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 1s ease-out;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const List = styled.ul`
  max-height: 45vh;
  overflow: auto;

  li {
    display: flex;
    align-items: center;
    height: 3rem;
    padding: 0 0.25rem;
    border-bottom: 1px solid ${PALETTE.GRAY_100};
    position: relative;

    p {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    button {
      margin-left: 0.5rem;
    }
  }
`;

const Distance = styled.span`
  position: absolute;
  left: 0.5rem;
  bottom: -0.6rem;
  font-size: 0.7rem;
  color: ${PALETTE.GRAY_400};
  height: 1rem;
  background-color: ${PALETTE.WHITE};
  padding: 0 0.25rem;
`;

const StationSelects = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
  }

  span {
    display: flex;
    align-items: center;
  }
`;

const StationSelectError = styled.div`
  font-size: 0.8rem;
  padding-top: 0.2rem;
  padding-left: 0.2rem;
  color: ${PALETTE.RED};
`;

export {
  Container,
  Icon,
  Form,
  List,
  StationSelects,
  StationSelectError,
  TitleBox,
  FormBox,
  Distance,
};
