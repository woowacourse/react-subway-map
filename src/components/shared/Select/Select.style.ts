import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  position: relative;

  :before {
    content: '';
    position: absolute;
    right: 0.2rem;
    top: 0.4rem;
    padding: 0;
    margin: 0;

    width: 0;
    height: 0;
    border-top: 0.4rem solid ${PALETTE.GRAY_500};
    border-bottom: 0.4rem solid transparent;
    border-left: 0.3rem solid transparent;
    border-right: 0.3rem solid transparent;
  }
`;

const SelectBody = styled.select`
  width: 100%;
  line-height: 1.5;
  background-color: transparent;
  z-index: 2;

  -webkit-appearance: none;
`;

export { Container, SelectBody };
