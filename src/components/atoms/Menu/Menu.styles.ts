import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/css';

const Container = styled.div`
  ${FlexCenterBox}

  & button:not(:last-child) {
    margin-right: 0.6rem;
  }
`;

export { Container };
