import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/css';

const Container = styled.form`
  ${FlexCenterBox};
  background-color: #fff;

  padding: 2rem 4rem;

  & > input {
    width: 100%;
  }

  & > button {
    width: 100px;
    margin-left: 1rem;
  }
`;

export { Container };
