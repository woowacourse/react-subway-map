import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import Button from '../../@common/Button/Button.styles';
import Container from '../../@common/Container/Container.styles';

export const StyledStationAddForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  border: 1px solid ${PALETTE.GRAY_300};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
`;

export const InputContainer = styled(Container)`
  justify-content: space-between;
  flex-wrap: nowrap;
`;

export const AddButton = styled(Button)`
  flex-basis: 15%;
  margin-left: 1.5rem;
`;
