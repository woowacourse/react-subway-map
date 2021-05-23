import styled from 'styled-components';
import { COLOR } from '../../constants';

export const Form = styled.form`
  width: 100%;
`;

export const PasswordSuggestion = styled.div`
  font-size: var(--size-small);
  padding: 0 4px;
`;

export const Validator = styled.div`
  height: 32px;
  padding: 0 8px;
  line-height: 32px;

  color: ${COLOR.RED};
`;
