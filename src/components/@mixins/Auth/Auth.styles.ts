import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import Container from '../../@common/Container/Container.styles';

export const StyledAuthForm = styled.form`
  border: 1px solid ${PALETTE.GRAY_300};
  padding: 2rem;
  box-sizing: border-box;
  min-width: 20rem;
  width: 30rem;
`;

export const ChildrenContainer = styled(Container)`
  flex-direction: column;

  & > * {
    margin-bottom: 1.75rem;
  }
`;
