import styled from 'styled-components';

import { COLOR } from '../../../constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.9rem 0;
`;

export const Label = styled.label`
  position: relative;
`;

export const LabelText = styled.span`
  position: absolute;
  top: -0.4rem;
  left: 0.5rem;
  padding: 0 0.3rem;
  width: auto;

  font-size: 0.6rem;
  color: ${COLOR.PLACEHOLDER};
  background-color: white;
`;

export const InputField = styled.input`
  padding: 0 1.5rem;
  padding-left: ${(props) => (props.icon ? '3.5rem' : '1.25rem')};
  width: 20rem;
  height: 2.5rem;

  font-size: 0.95rem;
  color: ${COLOR.TEXT.DEFAULT};
  border-radius: 0.25rem;
  border: 0.125rem solid ${COLOR.BORDER_DEFAULT};

  &::placeholder {
    color: ${COLOR.PLACEHOLDER};
    font-size: 0.9rem;
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
  height: 1rem;

  color: ${COLOR.ERROR};
  font-size: 0.75rem;
`;
