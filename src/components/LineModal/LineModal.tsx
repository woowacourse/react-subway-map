import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Input from 'components/shared/Input/Input';
import Button from 'components/shared/Button/Button';
import { ButtonType, Line, Station } from 'types';
import useFetch from 'hooks/useFetch';
import Styled from './LineModal.styles';
import {
  LINE_COLORS,
  REGEX,
  API_METHOD,
  API_STATUS,
  END_POINT,
  ALERT_MESSAGE,
  NOTIFICATION,
  INPUT,
} from '../../constants';
import useNotify from 'hooks/useNotify';

interface Props {
  stations?: Station[];
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

  const { setNotification: setLineNameNotification, Notification: LineNameNotification } =
    useNotify();

  const { fetchData: addLineAsync } = useFetch(API_METHOD.POST);
  const { fetchData: editLineAsync } = useFetch(API_METHOD.PUT);

  const { enqueueSnackbar } = useSnackbar();

  const stationOptions = stations.map((station) => ({ id: station.id, value: station.name }));

  const validateLineName = () => {
    const isValidLineName = REGEX.ONLY_KOREAN_AND_NUMBER.test(name);

    if (!isValidLineName) {
      setLineNameNotification({
        message: NOTIFICATION.LINEN_NAME,
        isValid: false,
        isVisible: true,
      });

      return false;
    } else {
      setLineNameNotification({ message: '', isValid: false, isVisible: false });

      return true;
    }
  };

  const addLine = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateLineName()) return;
    setLineNameNotification({ message: '', isValid: false, isVisible: false });

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
          extraArgs={{
            minLength: INPUT.LINE_NAME.MIN_LENGTH,
            maxLength: INPUT.LINE_NAME.MAX_LENGTH,
          }}
        />
        <LineNameNotification />
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
            extraArgs={{ min: INPUT.DISTANCE.MIN, max: INPUT.DISTANCE.MAX }}
          />
          <Input
            type="number"
            labelText="운임"
            value={extraFare}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setExtraFare(event.target.value)
            }
            extraArgs={{ min: INPUT.EXTRA_FARE.MIN, max: INPUT.EXTRA_FARE.MAX }}
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
          <Styled.SelectedColor color={color} value={color} readOnly required />
        </Styled.PaletteContent>
      </Styled.PaletteContainer>

      <Styled.ButtonsContainer>
        <Button styleType={ButtonType.YELLOW}>확인</Button>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default LineModal;
