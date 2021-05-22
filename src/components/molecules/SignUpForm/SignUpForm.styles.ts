import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/css';

const Container = styled.form`
  ${FlexCenterBox};
  flex-direction: column;
  background-color: #fff;
  padding: 2em 4rem;

  & > * {
    width: 100%;
  }

  & > input,
  & > button {
    margin-top: 2rem;
  }
`;

export { Container };
