import styled from 'styled-components';
import FlexContainer from '../@common/FlexContainer/FlexContainer';
import Form from '../@common/Form/Form';

export const LineAddForm = styled(Form)`
  & > * {
    margin: 2rem 1rem;
  }
`;

export const LineAddModalButtonContainer = styled(FlexContainer)`
  & > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;
