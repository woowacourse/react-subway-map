import styled from '@emotion/styled';
import { FlexCenter } from '../../../styles/css';

const Container = styled.form`
  ${FlexCenter};
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
