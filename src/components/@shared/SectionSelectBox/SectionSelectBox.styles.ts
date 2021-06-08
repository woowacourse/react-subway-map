import styled from 'styled-components';
import { Palette } from '../../../constants/palette';
import FlexContainer from '../../@common/FlexContainer/FlexContainer';
import HiddenLabel from '../../@common/a11y/HiddenLabel/HiddenLabel';

export const SectionSelectBoxContainer = styled(FlexContainer)`
  height: 5rem;
`;

export const SectionHiddenLabel = styled(HiddenLabel)``;

export const StationsSelectContainer = styled(FlexContainer)`
  width: 100%;

  & > ${SectionHiddenLabel} {
    flex-grow: 1;
  }

  & > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const SectionModalButtonContainer = styled(FlexContainer)`
  & > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const SectionSelectErrorMessage = styled.p`
  margin-top: 0.25rem;
  margin-left: 0.75rem;
  color: ${Palette.RED_400};

  &::before {
    content: '🚫 ';
  }
`;
