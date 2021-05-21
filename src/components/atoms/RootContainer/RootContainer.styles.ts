import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/css';

const Container = styled.div`
  ${FlexCenterBox};
  flex-direction: column;

  padding: 10px 350px;
  & > * {
    margin-top: 50px;
  }
`;

export { Container };
