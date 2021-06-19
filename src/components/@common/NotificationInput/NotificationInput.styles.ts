import styled from 'styled-components';
import { Palette } from '../../../constants/palette';
import FlexContainer from '../FlexContainer/FlexContainer';

interface NotificationTextProps {
  isError: boolean;
}

export const NotificationFormInputContainer = styled(FlexContainer)`
  height: 5rem;
`;

export const NotificationText = styled.p<NotificationTextProps>`
  margin-left: 0.75rem;
  color: ${({ isError }) => (isError ? Palette.RED_400 : Palette.GREEN_400)};

  &::before {
    content: ${({ isError }) => (isError ? '"🚫 "' : '"✅ "')};
  }
`;
