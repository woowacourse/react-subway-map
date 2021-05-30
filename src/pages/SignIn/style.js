import styled from 'styled-components';
import { COLOR } from '../../constants';

export const Form = styled.form`
  width: 100%;
  & > div {
    margin-bottom: 32px;
  }
`;

export const Validator = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  color: ${COLOR.RED};
`;
