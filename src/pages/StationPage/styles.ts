import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const InputWrapper = styled.div`
  flex: 1;
  margin-right: 12px;
`;

const StationsContainer = styled.ul`
  margin-top: 28px;
  height: 440px;
  overflow-y: auto;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const Icon = styled.img`
  width: 20px;
`;

const StationItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  padding: 0 8px;
  border-bottom: 1px solid ${PALETTE.LIGHT_GRAY};
  height: 48px;
  line-height: 48px;
`;

const EditingStationForm = styled.form`
  display: flex;
  width: 100%;
`;

const EditingStationInput = styled.input`
  width: 100%;
  margin-right: 4px;
  padding: 8px;
  border: 1px solid ${PALETTE.LIGHT_GRAY};
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
`;

export default {
  InputContainer,
  InputWrapper,
  ButtonsContainer,
  StationsContainer,
  Icon,
  StationItem,
  EditingStationForm,
  EditingStationInput,
};
