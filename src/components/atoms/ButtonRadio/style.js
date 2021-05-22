import styled from 'styled-components';
import { COLOR } from '../../../constants';

const BORDER_SIZE = '1.5rem';

export const RadioButtonLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const Border = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 10px;

  width: ${BORDER_SIZE};
  height: ${BORDER_SIZE};

  border-radius: 50%;
  border: 2px solid ${COLOR.THEME};
`;

export const CheckMark = styled.span`
  display: none;

  width: 0.8rem;
  height: 0.8rem;

  border-radius: 50%;
  transition: opacity 0.3s ease;

  border: 2px solid ${COLOR.THEME};
  padding: 3px;
`;

export const RadioButton = styled.input`
  display: none;

  &:checked ~ ${CheckMark} {
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
  width: 100%;
`;
