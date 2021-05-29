import styled from '@emotion/styled';
import { FlexCenter } from '../../../styles/css';

const Container = styled.form`
  ${FlexCenter};
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
