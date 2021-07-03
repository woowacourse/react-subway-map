import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/shared';

const Container = styled(FlexCenterBox)`
  flex-direction: column;

  padding: 10px 350px;
  & > * {
    margin-top: 50px;
  }
`;

export { Container };
