import styled from 'styled-components';

import PALETTE from '../../../constants/palette';

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${PALETTE.GRAY_50};
`;

export default Main;
