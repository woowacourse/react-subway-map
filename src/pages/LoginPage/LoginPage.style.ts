import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PALETTE from '../../constants/palette';

const Icon = styled.span`
  color: ${PALETTE.GRAY_500};
  margin-right: 0.5rem;
`;

const Heading1 = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${PALETTE.GRAY_600};
  margin-bottom: 2rem;
`;

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

const ErrorText = styled.p`
  font-size: 0.8rem;
  color: red;
  text-align: center;
  margin-bottom: 1rem;
`;

export { Icon, SignUpLink, Heading1, ErrorText };
