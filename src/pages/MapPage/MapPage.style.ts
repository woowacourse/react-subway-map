import styled from 'styled-components';
import PALETTE from '../../constants/palette';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;

  img {
    height: 420px;
  }
`;

const Lines = styled.div`
  overflow-x: auto;
`;

export { Container, Lines };
