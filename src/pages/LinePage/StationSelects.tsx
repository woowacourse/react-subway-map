import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { MdArrowForward } from 'react-icons/md';

import { ErrorText, Icon, InputContainer, Select } from '../../components/shared';

import { APIReturnTypeStation } from '../../hooks/useStations';
import { stationSelectErrorMessage } from '../../utils/validations/lineValidation';

import { Container } from './StationSelects.style';

interface StationSelectsProps {
  stations: APIReturnTypeStation[];
  upStationId: string;
  setUpStationId: Dispatch<SetStateAction<string>>;
  downStationId: string;
  setDownStationId: Dispatch<SetStateAction<string>>;
}

const StationSelects = ({
  stations,
  upStationId,
  setUpStationId,
  downStationId,
  setDownStationId,
}: StationSelectsProps) => {
  const onUpStationIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setUpStationId(event.target.value);
  };

  const onDownStationIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setDownStationId(event.target.value);
  };

  return (
    <Container>
      <div>
        <InputContainer labelText="상행 종점">
          <Select value={upStationId} onChange={onUpStationIdChange} aria-label="상행종점 선택">
            <option value="/" hidden>
              역 선택
            </option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </Select>
        </InputContainer>
        <Icon>
          <MdArrowForward size="1.5rem" />
        </Icon>
        <InputContainer labelText="하행 종점">
          <Select value={downStationId} onChange={onDownStationIdChange} aria-label="하행종점 선택">
            <option value="/" hidden>
              역 선택
            </option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </Select>
        </InputContainer>
      </div>
      <ErrorText>{stationSelectErrorMessage(upStationId, downStationId)}</ErrorText>
    </Container>
  );
};

export default StationSelects;
