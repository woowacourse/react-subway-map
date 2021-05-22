import styled from 'styled-components';
import { COLOR } from '../../../constants';

const CONTAINER_SIZE = '1.5rem';
const CHECK_MARK_SIZE = '100% - 0.5rem';

export const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem;

  width: ${CONTAINER_SIZE};
  height: ${CONTAINER_SIZE};

  border-radius: 50%;
  border: 0.125rem solid ${COLOR.THEME};
`;

export const CheckMark = styled.span`
  display: none;
  flex-direction: center;
  align-items: center;

  width: calc(${CHECK_MARK_SIZE});
  height: calc(${CHECK_MARK_SIZE});

  border-radius: 50%;
`;

export const RadioButton = styled.input`
  display: none;

  &:hover ~ ${CheckMark} {
    display: flex;
    background-color: ${COLOR.THEME_LIGHT};
  }
  &:checked ~ ${CheckMark} {
    display: flex;
    background-color: ${COLOR.THEME};
  }
  &:active ~ ${CheckMark} {
    display: flex;
    background-color: ${COLOR.THEME_STRONG};
  }
`;

export const Content = styled.div`
  width: 100%;
`;
