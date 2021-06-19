import styled from 'styled-components';
import { Palette } from '../../constants/palette';
import FlexContainer from '../@common/FlexContainer/FlexContainer';

export const LineColorContainer = styled(FlexContainer)`
  padding: 1rem;
  border: 1px solid ${Palette.GRAY_500};
  border-radius: 3px;
`;
