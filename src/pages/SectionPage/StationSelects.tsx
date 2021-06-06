import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { MdArrowForward } from 'react-icons/md';
import { ErrorText, Icon, InputContainer, Select } from '../../components/shared';
import { APIReturnTypeLine } from '../../hooks/useLines';
import { APIReturnTypeStation } from '../../hooks/useStations';
import { stationSelectErrorMessage } from '../../utils/validations/sectionValidation';
import { Container } from './StationSelects.style';

interface StationSelectsProps {
  stations: APIReturnTypeStation[];
  currentLine: APIReturnTypeLine | undefined;
  upStationId: string;
  setUpStationId: Dispatch<SetStateAction<string>>;
  downStationId: string;
  setDownStationId: Dispatch<SetStateAction<string>>;
}

const StationSelects = ({
  stations,
  currentLine,
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
        <InputContainer labelText="상행역">
          <Select value={upStationId} onChange={onUpStationIdChange} aria-label="상행역 선택">
            <option value="/" hidden>
              역 선택
            </option>
            {stations?.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </Select>
        </InputContainer>
        <Icon>
          <MdArrowForward size="1.5rem" />
        </Icon>
        <InputContainer labelText="하행역">
          <Select value={downStationId} onChange={onDownStationIdChange} aria-label="하행역 선택">
            <option value="/" hidden>
              역 선택
            </option>
            {stations?.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </Select>
        </InputContainer>
      </div>
      <ErrorText>
        {currentLine && stationSelectErrorMessage(currentLine, upStationId, downStationId)}
      </ErrorText>
    </Container>
  );
};

export default StationSelects;
