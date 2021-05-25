import React, { useEffect, useState } from 'react';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import Styled from './LineModal.styles';
import { ButtonType, Line, Station } from 'types';
import LINE_COLORS from 'constants/lineColors';
import useFetch from 'hooks/useFetch';
import { API_STATUS, END_POINT } from 'constants/api';
import { ALERT_MESSAGE } from 'constants/messages';

interface LineModalProps {
  stations: Station[] | undefined;
  selectedLine?: { name: string; color: string };
  closeModal: () => void;
}

const LineModal = ({ stations = [], selectedLine, closeModal }: LineModalProps) => {
  const { fetchData: getLinesAsync } = useFetch<Line[]>();
  const { fetchData: addLineAsync } = useFetch<Line>();

  const [color, setColor] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [upStationId, setUpStationId] = useState<number>();
  const [downStationId, setDownStationId] = useState<number>();
  const [distance, setDistance] = useState<number>();
  const [extraFare, setExtraFare] = useState<number>();

  const stationOptions = stations.map((station) => ({ id: station.id, value: station.name }));

  const addLine = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newLine = {
      name,
      color,
      upStationId,
      downStationId,
      distance,
      extraFare,
    };

    const res = await addLineAsync('POST', END_POINT.LINES, newLine);

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_ADD_LINE);
    } else if (res.status === API_STATUS.FULFILLED) {
      getLinesAsync('GET', END_POINT.LINES);
      // TODO: form reset
      closeModal();
    }
  };

  useEffect(() => {
    if (selectedLine) {
      console.log(selectedLine);
      setName(selectedLine.name);
      setColor(selectedLine.color);
    } else {
      setName('');
      setColor('');
    }
  }, [selectedLine]);

  return (
    <Styled.Container onSubmit={addLine}>
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
                options={stationOptions}
                onSelect={(event) => setUpStationId(Number(event.target.value))}
              />
            </Styled.DropdownWrapper>
            <Styled.DropdownWrapper>
              <Dropdown
                labelText="하행 종점"
                defaultOption="하행 종점"
                options={stationOptions}
                onSelect={(event) => setDownStationId(Number(event.target.value))}
              />
            </Styled.DropdownWrapper>
          </Styled.StationInputWrapper>
          <Input
            type="number"
            labelText="거리"
            value={distance}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDistance(Number(event.target.value))
            }
          />
          <Input
            type="number"
            labelText="운임"
            value={extraFare}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setExtraFare(Number(event.target.value))
            }
          />
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
                onClick={() => setColor(color)}
              ></Styled.ColorOption>
            ))}
          </Styled.ColorPalette>
          <Styled.SelectedColor color={color}>{color}</Styled.SelectedColor>
        </Styled.PaletteContent>
      </Styled.PaletteContainer>

      <Styled.ButtonsContainer>
        <TextButton text="확인" styleType={ButtonType.FILLED}></TextButton>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default LineModal;
