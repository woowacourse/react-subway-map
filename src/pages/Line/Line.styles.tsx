import styled from '@emotion/styled';
import { COLOR } from '../../constants/style';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LineList = styled.ul`
  padding: 0;
  margin: 0;
  & > li:not(:last-child) {
    border-bottom: 1px solid ${COLOR.GRAY_300};
  }
`;
