import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/css';

const Container = styled.div`
  width: 100%;
  ${FlexCenterBox};
  flex-direction: column;

  & > * {
    width: 100%;
  }
`;

export { Container };
