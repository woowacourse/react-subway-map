import styled from 'styled-components';
import { Color } from '../../../constants/palette';
import FlexContainer from '../../@common/FlexContainer/FlexContainer';

export const StyledHeader = styled.header<{ themeColor: Color }>`
  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ themeColor }) => themeColor[400]};
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
