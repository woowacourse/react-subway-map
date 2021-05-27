import React from 'react';
import { PALETTE } from '../../constants/styleConstant';

import { Line, Station } from '../../interfaces';
import Button from '../@commons/Button/Button';
import Input from '../@commons/Input/Input';
import SelectInput from '../@commons/SelectInput/SelectInput';
import { getLineNameErrorMessage } from './AddLineForm';

import * as S from './LineModalForm.styles';

export interface LineInfo {
  name: string;
  color: string;
  upStationId: string;
  downStationId: string;
  distance: string;
}
interface Props {
  lines: Line[];
  lineInfo: LineInfo;
  stations: Station[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | React.MouseEvent<HTMLElement>) => void;
  onSubmit: (isValidForm: boolean, e: React.FormEvent<HTMLFormElement>) => void;
  onModalClose: () => void;
}

const getLineStationErrorMessage = (upStationId: number, downStationId: number) => {
  if (!upStationId || !downStationId) {
    return '상행 종점역과 하행 종점역을 선택해주세요.';
  }

  if (upStationId === downStationId) {
    return '상행 종점역과 하행 종점역은 동일할 수 없습니다.';
  }

  return '';
};

const getLineDistanceErrorMessage = (distance: number) => {
  if (isNaN(distance)) {
    return '노선의 거리는 숫자여야 합니다.';
  }
  if (distance < 1) {
    return '노선의 거리는 최소 1km 이상이여야 합니다.';
  }

  return '';
};

const getLineColorErrorMessage = (color: string, lines: Line[]) => {
  if (!color) {
    return '노선 색상을 선택해주세요.';
  }

  if (lines.some(line => line.color === color)) {
    return '이미 노선에 등록된 색상입니다.\n다른 색상을 선택해주세요.';
  }

  return '';
};

const LineModalForm = ({ lines, lineInfo, stations, onChange, onSubmit, onModalClose }: Props) => {
  const lineNameErrorMessage = getLineNameErrorMessage(lineInfo.name, lines);
  const lineStationErrorMessage = getLineStationErrorMessage(
    Number(lineInfo.upStationId),
    Number(lineInfo.downStationId)
  );
  const lineDistanceErrorMessage = getLineDistanceErrorMessage(Number(lineInfo.distance));
  const lineColorErrorMessage = getLineColorErrorMessage(lineInfo.color, lines);
  const isValidForm = !(
    lineNameErrorMessage ||
    lineStationErrorMessage ||
    lineDistanceErrorMessage ||
    lineColorErrorMessage
  );

  return (
    <S.LineModalForm onSubmit={e => onSubmit(isValidForm, e)}>
      <S.Title>노선 생성</S.Title>
      <S.InputWrapper>
        <Input value={lineInfo.name} label='노선 이름' name='name' onChange={onChange} required />
        <S.Message>{lineInfo.name && lineNameErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.SelectInputWrapper>
          <SelectInput initialText='상행 종점' name='upStationId' value={lineInfo.upStationId} onChange={onChange}>
            {stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </SelectInput>
          <S.Arrow>↔</S.Arrow>
          <SelectInput initialText='하행 종점' name='downStationId' value={lineInfo.downStationId} onChange={onChange}>
            {stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </SelectInput>
        </S.SelectInputWrapper>
        <S.Message textAlign='center'>{lineInfo.upStationId && lineStationErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input type='number' value={lineInfo.distance} label='거리(km)' name='distance' onChange={onChange} required />
        <S.Message>{lineInfo.distance && lineDistanceErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.PaletteContainer>
        <S.PaletteTitle>노선 색상 선택</S.PaletteTitle>
        <S.PaletteWrapper>
          {Object.values(PALETTE).map(color => (
            <S.Palette type='button' key={color} color={color} name='color' value={color} onClick={onChange} />
          ))}
          <S.SelectedPalette color={lineInfo.color}>{lineColorErrorMessage}</S.SelectedPalette>
        </S.PaletteWrapper>
      </S.PaletteContainer>
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
    </S.LineModalForm>
  );
};

export default LineModalForm;
