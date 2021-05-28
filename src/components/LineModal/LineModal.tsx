import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import Notification from 'components/shared/Notification/Notification';
import { ButtonType, Line, Station } from 'types';
import LINE_COLORS from 'constants/lineColors';
import { API_STATUS, END_POINT } from 'constants/api';
import regex from 'constants/regex';
import { ALERT_MESSAGE, NOTIFICATION } from 'constants/messages';
import useFetch from 'hooks/useFetch';
import Styled from './LineModal.styles';

interface Props {
  stations: Station[] | undefined;
  selectedLine?: Line;
  selectedColors: string[];
  closeModal: () => void;
  getLines: () => Promise<void>;
}

const LineModal = ({
  stations = [],
  selectedLine,
  selectedColors,
  closeModal,
  getLines,
}: Props) => {
  const [color, setColor] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [upStationId, setUpStationId] = useState<string>('');
  const [downStationId, setDownStationId] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [extraFare, setExtraFare] = useState<string>('');

  const [isMessageValid, setMessageValid] = useState<boolean>(false);
  const [isMessageVisible, setMessageVisible] = useState<boolean>(false);

  const { fetchData: addLineAsync } = useFetch('POST');
  const { fetchData: editLineAsync } = useFetch('PUT');

  const { enqueueSnackbar } = useSnackbar();

  const stationOptions = stations.map((station) => ({ id: station.id, value: station.name }));

  const validateLineName = () => {
    const isValidLineName = regex.koreanAndNumber.test(name);

    if (!isValidLineName) {
      setMessageValid(false);
      setMessageVisible(true);

      return false;
    } else {
      setMessageVisible(false);
      return true;
    }
  };

  const addLine = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateLineName()) return;

    setMessageVisible(false);

    const newLine = {
      name,
      color,
      upStationId,
      downStationId,
      distance,
      extraFare,
    };

    const res = await addLineAsync(END_POINT.LINES, newLine);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.status === API_STATUS.FULFILLED) {
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_ADD_LINE);
      resetForm();
      closeModal();

      await getLines();
    }
  };

  const editLine = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateLineName()) return;
    if (!selectedLine) return;

    const updatedLine = { name, color };
    const res = await editLineAsync(`${END_POINT.LINES}/${selectedLine.id}`, updatedLine);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.status === API_STATUS.FULFILLED) {
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_EDIT_LINE);
      closeModal();

      await getLines();
    }
  };

  const resetForm = () => {
    setColor('');
    setName('');
    setUpStationId('');
    setDownStationId('');
    setDistance('');
    setExtraFare('');
  };

  useEffect(() => {
    if (selectedLine) {
      setName(selectedLine.name);
      setColor(selectedLine.color);
    } else {
      setName('');
      setColor('');
    }
  }, [selectedLine]);

  return (
    <Styled.Container onSubmit={selectedLine ? editLine : addLine}>
      <div>
        <Input
          type="text"
          labelText="노선 이름"
          value={name}
          onBlur={validateLineName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          extraArgs={{ minLength: 2, maxLength: 10 }}
        />
        <Notification
          isValid={isMessageValid}
          isVisible={isMessageVisible}
          message={NOTIFICATION.STATION_NAME}
        />
      </div>
      {!selectedLine && (
        <>
          <Styled.StationInputWrapper>
            <Styled.DropdownWrapper>
              <Dropdown
                labelText="상행 종점"
                defaultOption="상행 종점"
                value={upStationId}
                options={stationOptions}
                onSelect={(event) => setUpStationId(event.target.value)}
              />
            </Styled.DropdownWrapper>
            <Styled.DropdownWrapper>
              <Dropdown
                labelText="하행 종점"
                defaultOption="하행 종점"
                value={downStationId}
                options={stationOptions}
                onSelect={(event) => setDownStationId(event.target.value)}
              />
            </Styled.DropdownWrapper>
          </Styled.StationInputWrapper>
          <Input
            type="number"
            labelText="거리"
            value={distance}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDistance(event.target.value)
            }
            extraArgs={{ min: '1', max: Number.MAX_SAFE_INTEGER.toString() }}
          />
          <Input
            type="number"
            labelText="운임"
            value={extraFare}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setExtraFare(event.target.value)
            }
            extraArgs={{ min: '0', max: Number.MAX_SAFE_INTEGER.toString() }}
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
                type="button"
                disabled={selectedColors.includes(color)}
                color={color}
                onClick={() => setColor(color)}
              ></Styled.ColorOption>
            ))}
          </Styled.ColorPalette>
          <Styled.SelectedColor color={color} value={color} required />
        </Styled.PaletteContent>
      </Styled.PaletteContainer>

      <Styled.ButtonsContainer>
        <TextButton text="확인" styleType={ButtonType.YELLOW}></TextButton>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default LineModal;
