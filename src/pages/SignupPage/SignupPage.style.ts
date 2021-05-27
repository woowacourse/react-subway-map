import styled from 'styled-components';
import PALETTE from '../../constants/palette';

const Icon = styled.span`
  color: ${PALETTE.GRAY_500};
  margin-right: 0.5rem;
`;

const Form = styled.form`
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export { Icon, Form };
