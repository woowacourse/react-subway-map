import { THEME_COLOR } from '../../../constants/appInfo';
import styled from 'styled-components';
import FlexContainer from '../../@common/FlexContainer/FlexContainer';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${THEME_COLOR[400]};
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
