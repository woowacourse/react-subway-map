import styled from '@emotion/styled';
import { COLOR } from '../../constants/styleConstant';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StationList = styled.ul`
  padding: 0 1rem;
  margin: 0;
  & > li:not(:last-child) {
    border-bottom: 1px solid ${COLOR.GRAY_300};
  }
  max-height: 30rem;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0.5rem;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    height: 4px;
    width: 4px;
    background-color: ${COLOR.GRAY_700};
  }
`;
