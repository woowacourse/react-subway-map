import { useEffect, useState } from 'react';
import Input from '../@commons/Input/Input';
import Button from '../@commons/Button/Button';
import SelectInput from '../@commons/SelectInput/SelectInput';
import { Line, Station, AddSectionRequest, LineSection } from '../../interfaces';
import { getDistanceErrorMessage, getLineErrorMessage, getStationsErrorMessage } from './SectionModalForm.validation';
import * as S from './SectionModalForm.styles';

interface Props {
  lineSection: LineSection;
  lines: Line[];
  stations: Station[];
  onSelectLine: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCloseModal: () => void;
  addSection: (payload: AddSectionRequest) => void;
}

const initSectionInfo = {
  lineId: '',
  upStationId: '',
  downStationId: '',
  distance: '',
};

const SectionModalForm = ({ lineSection, lines, stations, onSelectLine, onCloseModal, addSection }: Props) => {
  const [sectionInfo, setSectionInfo] = useState(initSectionInfo);

  const handleLineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectLine(e);
    handleChange(e);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSectionInfo({ ...sectionInfo, [e.target.name]: e.target.value });
  };

  const handleAddSection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm) return;

    addSection(sectionInfo);
    onCloseModal();
  };

  useEffect(() => {
    setSectionInfo({ ...sectionInfo, lineId: String(lineSection.id) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineSection.id]);

  const lineErrorMessage = getLineErrorMessage(sectionInfo.lineId);
  const stationsErrorMessage = getStationsErrorMessage(lineSection, sectionInfo.upStationId, sectionInfo.downStationId);
  const distanceErrorMessage = getDistanceErrorMessage(
    lineSection,
    sectionInfo.upStationId,
    sectionInfo.downStationId,
    Number(sectionInfo.distance)
  );

  const isValidForm = !(lineErrorMessage || stationsErrorMessage || distanceErrorMessage);

  return (
    <S.SectionModalForm onSubmit={handleAddSection}>
      <S.Title>구간 생성</S.Title>
      <S.InputWrapper>
        <SelectInput
          name='lineId'
          value={lineSection.id}
          initialText='노선을 선택해주세요'
          label='노선 선택'
          onChange={handleLineChange}
        >
          {lines.map(line => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </SelectInput>
        <S.Message>{sectionInfo.lineId && lineErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.SelectInputWrapper>
          <SelectInput
            initialText='역을 선택해주세요'
            value={sectionInfo.upStationId}
            label='상행역'
            name='upStationId'
            onChange={handleChange}
          >
            {stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </SelectInput>
          <S.Arrow>↔</S.Arrow>
          <SelectInput
            initialText='역을 선택해주세요'
            value={sectionInfo.downStationId}
            label='하행역'
            name='downStationId'
            onChange={handleChange}
          >
            {stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </SelectInput>
        </S.SelectInputWrapper>
        <S.Message textAlign='center'>
          {(sectionInfo.upStationId || sectionInfo.downStationId) && stationsErrorMessage}
        </S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input label='거리' value={sectionInfo.distance} placeholder='거리' name='distance' onChange={handleChange} />
        <S.Message>{sectionInfo.distance && distanceErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.ButtonContainer>
        <S.ButtonWrapper>
          <Button type='button' bgColor='TRANSPARENT' fontColor='BLACK' onClick={onCloseModal}>
            취소
          </Button>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <Button isDisabled={!isValidForm}>노선 추가하기</Button>
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.SectionModalForm>
  );
};

export default SectionModalForm;
