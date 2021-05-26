import styled from 'styled-components';

import { COLOR } from '../../../constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

export const Label = styled.label`
  position: relative;
`;

export const InputField = styled.input`
  padding: 0 1.5rem;
  padding-left: ${(props) => (props.icon ? '3.5rem' : '1.5rem')};
  width: 20rem;
  height: 2.5rem;

  font-size: 1rem;
  color: ${COLOR.TEXT.DEFAULT};
  border-radius: 0.25rem;
  border: 0.125rem solid ${COLOR.BORDER_DEFAULT};

  &::placeholder {
    color: ${COLOR.PLACEHOLDER};
  }

  &:focus {
    outline-color: ${COLOR.THEME};
  }
`;

export const Icon = styled.span`
  position: absolute;
  top: 0.5rem;
  left: 1.25rem;
`;

export const Message = styled.span`
  padding: 0.5rem 0 0 3.5rem;
  height: 1.75rem;

  color: ${COLOR.ERROR};
  font-size: 0.85rem;
`;
