import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Icon = styled.span`
  color: #777777;
  margin-right: 0.5rem;
`;

const Heading1 = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #444444;
  margin-bottom: 2rem;
`;

const SignUpLink = styled(Link)`
  color: #777777;
  display: block;
  width: fit-content;
  margin: 1rem auto 0;

  :hover {
    text-decoration-line: underline;
    text-underline-offset: 0.1rem;
  }
`;

export { Icon, SignUpLink, Heading1 };
