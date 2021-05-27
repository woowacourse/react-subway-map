import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: block;
  position: relative;
  background-color: transparent;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-weight: 600;
  overflow: hidden;
  text-align: center;

  &:hover::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.07);
  }
`;

export default StyledLink;
