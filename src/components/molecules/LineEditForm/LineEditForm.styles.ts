import styled from '@emotion/styled';
import { FlexCenter } from '../../../styles/css';

const StyledForm = styled.form`
  ${FlexCenter}
  flex-direction: column;
  background-color: #ffffff;
  padding: 2rem 10rem;

  & > * {
    width: 100%;
  }

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
  & > * {
    width: 100%;
  }
`;

export { StyledForm, Wrapper };
