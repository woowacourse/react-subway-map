import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PALETTE from '../../constants/palette';

const SignUpLink = styled(Link)`
  color: ${PALETTE.GRAY_500};
  display: block;
  width: fit-content;
  margin: 1rem auto 0;

  :hover {
    text-decoration-line: underline;
    text-underline-offset: 0.1rem;
  }
`;

const Form = styled.form`
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export { SignUpLink, Form };
