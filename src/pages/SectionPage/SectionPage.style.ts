import styled from 'styled-components';

import PALETTE from '../../constants/palette';
import { Container as Box } from '../../components/shared/Box/Box.style';
import Z_INDEX from '../../constants/zIndex';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 0.05rem;
  }
  min-height: 70vh;
`;

const TitleBox = styled<any>(Box)`
  & button[type='button'] {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${Z_INDEX.TITLE_BOX};
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
  transition: max-height 1.2s ease, padding 1.2s ease;
  overflow: hidden;
  ${({ isOpen }) =>
    isOpen
      ? 'max-height: 700px; form {opacity: 1;}'
      : 'max-height: 0; padding-top: 0; padding-bottom: 0; form {opacity: 0;}'}
  position: relative;
  margin: 0.05rem 0;

  form {
    transition: opacity 0.8s ease;
  }
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

const Distance = styled.span`
  position: absolute;
  left: 0.5rem;
  bottom: -0.6rem;
  font-size: 0.7rem;
  color: ${PALETTE.GRAY_400};
  height: 1rem;
  background-color: ${PALETTE.WHITE_100};
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

export { Container, Form, StationSelects, TitleBox, FormBox, Distance };
