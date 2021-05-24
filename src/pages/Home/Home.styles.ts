import styled from 'styled-components';
import FlexContainer from '../../components/@common/FlexContainer/FlexContainer';

export const APIList = styled.ul`
  font-size: 1.25rem;
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin: 5rem auto 4rem;
`;

export const HomeLinkContainer = styled(FlexContainer)`
  margin-bottom: 3rem;

  a {
    margin: 0 1rem;
  }
`;
