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

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export { Container };
