import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/shared';

const Container = styled(FlexCenterBox)`
  width: 100%;

  & button:not(:last-child) {
    margin-right: 0.6rem;
  }
`

export { Container };
