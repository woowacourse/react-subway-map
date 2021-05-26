import styled from 'styled-components';

import { IconCheck } from '../IconCheck';
import { COLOR } from '../../../constants';

export const Container = styled.div`
  padding: 1rem;
  width: 100%;

  border: 0.125rem solid ${COLOR.BORDER_DEFAULT};
`;

export const Title = styled.h3`
  margin-bottom: 0.75rem;

  text-align: center;
  color: ${COLOR.TEXT.DEFAULT};
  font-size: 1rem;
  font-weight: 400;
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 1rem;
  justify-content: center;
  width: 100%;
  padding: 1.5rem;

  list-style-type: none;
`;

export const Item = styled.li`
  position: relative;
  width: 2rem;
  height: 2rem;

  background-color: ${(props) => props.color};
  border-radius: 0.25rem;
  border: 0.125rem solid #fff;
  box-shadow: 0.15rem 0.15rem 0.3rem rgba(0, 0, 0, 0.15);
`;

export const Label = styled.label``;

export const RadioButton = styled.input`
  margin: 0;
  width: 100%;
  height: 100%;

  opacity: 0;
  cursor: pointer;
`;

export const CheckMark = styled(IconCheck)`
  position: absolute;
  top: 0;
  left: 0.15rem;
  display: none;

  ${RadioButton}:checked + & {
    display: inline-block;
  }
`;
