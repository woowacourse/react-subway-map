import { useEffect, useState } from 'react';
import { AddSectionPayload, Line, LineSection, Station } from '../../interfaces';
import Button from '../@commons/Button/Button';
import Input from '../@commons/Input/Input';
import SelectInput from '../@commons/SelectInput/SelectInput';
import * as S from './SectionModalForm.styles';

interface Props {
  lineSection: LineSection;
  lines: Line[];
  stations: Station[];
  onLineChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onModalClose: () => void;
  addSection: (payload: AddSectionPayload) => void;
}

const initSectionInfo = {
  lineId: '',
  upStationId: '',
  downStationId: '',
  distance: '',
};

const getLineErrorMessage = (lineId: string) => {
  if (!lineId) {
    return '구간을 생성할 노선을 선택해주세요.';
  }

  return '';
};

const getStationsErrorMessage = (lineSection: LineSection, upStationId: string, downStationId: string) => {
  if (Object.keys(lineSection).length === 0) {
    return '노선을 먼저 선택해주세요.';
  }

  if (!upStationId || !downStationId) {
    return '상행역과 하행역을 모두 선택해주세요.';
  }

  if (upStationId === downStationId) {
    return '상행역과 하행역은 동일할 수 없습니다.';
  }

  const hasUpStationInLine = lineSection.stations.some(({ id }) => String(id) === upStationId);
  const hasDownStationInLine = lineSection.stations.some(({ id }) => String(id) === downStationId);

  if (hasUpStationInLine ? hasDownStationInLine : !hasDownStationInLine) {
    return '상행역과 하행역 둘 중에 하나의 역만 기존 노선에 등록되어 있어야합니다.';
  }

  return '';
};

const getDistanceErrorMessage = (
  lineSection: LineSection,
  upStationId: string,
  downStationId: string,
  distance: number
) => {
  if (isNaN(distance)) {
    return '노선의 거리는 숫자여야 합니다.';
  }
  if (distance < 1) {
    return '노선의 거리는 최소 1km 이상이여야 합니다.';
  }

  if (Object.keys(lineSection).length === 0) {
    return '노선을 먼저 선택해주세요.';
  }

  if (!upStationId || !downStationId) {
    return '상행역과 하행역을 먼저 선택해주시기 바랍니다.';
  }

  const hasUpStationInLine = lineSection.stations.some(({ id }) => String(id) === upStationId);
  const hasDownStationInLine = lineSection.stations.some(({ id }) => String(id) === downStationId);
  if (hasUpStationInLine ? hasDownStationInLine : !hasDownStationInLine) {
    return '올바른 상행역과 하행역을 먼저 선택해주시기 바랍니다.';
  }

  const stationStandard = hasUpStationInLine ? 'upStation' : 'downStation';

  if (
    lineSection.sections.some(({ upStation, downStation, distance: currentDistance }) => {
      return (
        (stationStandard === 'upStation'
          ? String(upStation.id) === upStationId
          : String(downStation.id) === downStationId) && currentDistance <= distance
      );
    })
  ) {
    return '해당 구역의 거리보다 긴 거리를 등록할 순 없습니다.';
  }

  return '';
};

const SectionModalForm = ({ lineSection, lines, stations, onLineChange, onModalClose, addSection }: Props) => {
  const [sectionInfo, setSectionInfo] = useState(initSectionInfo);

  const handleLineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLineChange(e);
    handleChange(e);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSectionInfo({ ...sectionInfo, [e.target.name]: e.target.value });
  };

  const handleAddSection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm) return;

    addSection(sectionInfo);
    onModalClose();
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
        <S.Message>{lineErrorMessage}</S.Message>
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
        <S.Message>{stationsErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input label='거리' value={sectionInfo.distance} placeholder='거리' name='distance' onChange={handleChange} />
        <S.Message>{distanceErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.ButtonContainer>
        <S.ButtonWrapper>
          <Button type='button' bgColor='TRANSPARENT' fontColor='BLACK' onClick={onModalClose}>
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
