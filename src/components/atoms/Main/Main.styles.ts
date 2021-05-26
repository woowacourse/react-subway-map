import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/css';

const Container = styled.main`
  min-width: 1000px;
  ${FlexCenterBox};
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 6px 21px 0px #ccc;
  padding: 2rem 4rem;
`;

export { Container };
