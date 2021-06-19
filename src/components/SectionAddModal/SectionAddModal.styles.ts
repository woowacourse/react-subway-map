import styled from 'styled-components';
import FlexContainer from '../@common/FlexContainer/FlexContainer';
import Form from '../@common/Form/Form';
import SelectBox from '../@common/SelectBox/SelectBox';

export const SectionForm = styled(Form)`
  & > * {
    margin: 2rem 1rem;
  }
`;

export const StationSelectBox = styled(SelectBox)``;

export const StationContainer = styled(FlexContainer)`
  ${StationSelectBox} {
    flex-grow: 1;
  }

  & > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const SectionAddModalButtonContainer = styled(FlexContainer)`
  & > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;
