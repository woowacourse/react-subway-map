import styled from 'styled-components';
import { COLOR } from '../../constants';

export const Container = styled.div`
  background-color: ${COLOR.GRAY_500};
  margin-bottom: 40px;
  padding: 12px;
  border-radius: 4px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);

  & > span {
    color: ${COLOR.WHITE};
  }
`;
