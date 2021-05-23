import React, { useEffect, useState } from 'react';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import Styled from './LineModal.styles';
import { ButtonType } from 'types';
import LINE_COLORS from 'constants/lineColors';

interface LineModalProps {
  stations: string[] | undefined;
  selectedLine?: { name: string; color: string };
}

const LineModal = ({ stations = [], selectedLine }: LineModalProps) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [name, setName] = useState('');

  const selectUpStation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };

  const selectDownStation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };

  useEffect(() => {
    if (selectedLine) {
      console.log(selectedLine);
      setName(selectedLine.name);
      setSelectedColor(selectedLine.color);
    } else {
      setName('');
      setSelectedColor('');
    }
  }, [selectedLine]);

  return (
    <>
      <Styled.Container>
        <Input
          type="text"
          labelText="노선 이름"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
        {!selectedLine && (
          <>
            <Styled.StationInputWrapper>
              <Styled.DropdownWrapper>
                <Dropdown
                  labelText="상행 종점"
                  defaultOption="상행 종점"
                  options={stations}
                  onSelect={selectUpStation}
                />
              </Styled.DropdownWrapper>
              <Styled.DropdownWrapper>
                <Dropdown
                  labelText="하행 종점"
                  defaultOption="하행 종점"
                  options={stations}
                  onSelect={selectDownStation}
                />
              </Styled.DropdownWrapper>
            </Styled.StationInputWrapper>
            <Input type="number" labelText="거리" />
          </>
        )}
        <Styled.PaletteContainer>
          <Styled.PaletteLabel>색상</Styled.PaletteLabel>
          <Styled.PaletteContent>
            <Styled.ColorPalette>
              {LINE_COLORS.map((color) => (
                <Styled.ColorOption
                  key={color}
                  color={color}
                  onClick={() => setSelectedColor(color)}
                ></Styled.ColorOption>
              ))}
            </Styled.ColorPalette>
            <Styled.SelectedColor color={selectedColor}>{selectedColor}</Styled.SelectedColor>
          </Styled.PaletteContent>
        </Styled.PaletteContainer>

        <Styled.ButtonsContainer>
          <TextButton text="확인" styleType={ButtonType.FILLED}></TextButton>
        </Styled.ButtonsContainer>
      </Styled.Container>
    </>
  );
};

export default LineModal;
