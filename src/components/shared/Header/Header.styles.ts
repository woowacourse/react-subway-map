import { THEME_COLOR } from './../../../constants/palette';
import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${THEME_COLOR['400']};
  padding: 1.25rem 2rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;
