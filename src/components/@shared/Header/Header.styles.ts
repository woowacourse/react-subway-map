import { Z_INDEX } from './../../../constants/css';
import styled from 'styled-components';
import FlexContainer from '../../@common/FlexContainer/FlexContainer';
import { Palette } from '../../../constants/palette';

export const StyledHeader = styled.header<{ themeColor: Palette }>`
  position: sticky;
  top: 0;
  z-index: ${Z_INDEX.HEADER};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ themeColor }) => themeColor};
  padding: 1.25rem 2rem;
`;

export const TitleContainer = styled(FlexContainer)`
  & > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

TitleContainer.defaultProps = {
  alignItems: 'center',
};
