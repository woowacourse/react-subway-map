import React from 'react';
import { PALETTE } from '../../constants/styleConstant';
import { Station } from '../../interfaces';
import Button from '../@commons/Button/Button';
import Input from '../@commons/Input/Input';
import SelectInput from '../@commons/SelectInput/SelectInput';

import * as S from './LineModalForm.styles';

interface LineInfo {
  name: string;
  color: string;
  upStationId: string;
  downStationId: string;
  distance: string;
}
interface Props {
  lineInfo: LineInfo;
  stations: Station[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | React.MouseEvent<HTMLElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onModalClose: () => void;
}

const LineModalForm = ({ lineInfo, stations, onChange, onSubmit, onModalClose }: Props) => {
  return (
    <S.LineModalForm onSubmit={onSubmit}>
      <S.Title>노선 생성</S.Title>
      <S.InputWrapper>
        <Input value={lineInfo.name} label='노선 이름' name='name' onChange={onChange} required />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.SelectInputWrapper>
          <SelectInput initialText='상행 종점' name='upStationId' onChange={onChange}>
            {stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </SelectInput>
          <S.Arrow>↔</S.Arrow>
          <SelectInput initialText='하행 종점' name='downStationId' onChange={onChange}>
            {stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </SelectInput>
        </S.SelectInputWrapper>
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input type='number' value={lineInfo.distance} label='거리' name='distance' onChange={onChange} required />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.PaletteContainer>
        <S.PaletteTitle>노선 색상 선택</S.PaletteTitle>
        <S.PaletteWrapper>
          {Object.values(PALETTE).map(color => (
            <S.Palette type='button' key={color} color={color} name='color' value={color} onClick={onChange} />
          ))}
          <S.SelectedPalette color={lineInfo.color} />
        </S.PaletteWrapper>
      </S.PaletteContainer>
      <S.ButtonContainer>
        <S.ButtonWrapper>
          <Button bgColor='TRANSPARENT' fontColor='BLACK' onClick={onModalClose}>
            취소
          </Button>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <Button>노선 추가하기</Button>
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.LineModalForm>
  );
};

export default LineModalForm;
