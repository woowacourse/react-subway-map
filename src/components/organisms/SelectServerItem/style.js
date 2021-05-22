import styled from 'styled-components';

import { COLOR } from '../../../constants';

export const Item = styled.li`
  margin: 1rem 1.75rem;
`;

export const RadioButtonLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const RadioButton = styled.input`
  display: none;

  &:checked + span {
    display: inline-block;
    width: calc(100%-0.5rem);
    height: calc(100%-0.5rem);
    display: flex;
    flex-direction: center;
    align-items: center;
    background-color: ${COLOR.THEME};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Name = styled.span`
  margin: 1rem 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
`;

export const Nickname = styled.span`
  margin: 0.25rem 0 1rem;
  font-size: 0.85rem;
`;

export const Image = styled.img`
  width: 6rem;
`;
