import { FormEvent, Suspense, VFC } from 'react';
import { lineColors } from '../../../constants/service';
import { INVALID_VALUE } from '../../../constants/validate';
import useLine from '../../../service/hooks/useLine';
import useLineAddForm from '../../../service/hooks/useLineAddForm';
import useStation from '../../../service/hooks/useStation';
import { Station } from '../../../types';
import Button from '../../@common/Button/Button.styles';
import Modal from '../../@common/Modal/Modal';
import SelectBox from '../../@common/SelectBox/SelectBox';
import Title from '../../@common/Title/Title.styles';
import {
  StyledInput,
  StyledContainer,
  BidirectionArrowIcon,
  LineAddForm,
  StyledInputWithAlertText,
  ColorSelectButton,
  ColorPicker,
} from './LineAddModal.styles';

export interface LineAddModalProps {
  closeModal: () => void;
}

const LineAddModal: VFC<LineAddModalProps> = ({ closeModal }) => {
  const {
    form,
    setName,
    setDistance,
    setUpStationId,
    setDownStationId,
    setColor,
    isValidName,
    isValidForm,
    isSelectedUpStation,
    availableDownStations,
  } = useLineAddForm();
  const { addLine, linesQuery } = useLine();
  const { stationsQuery } = useStation();

  const handleAddLine = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addLine(form);
    closeModal();
  };

  return (
    <Modal size="medium" closeModal={closeModal}>
      <Title>노선 생성</Title>
      <LineAddForm onSubmit={handleAddLine}>
        <StyledInputWithAlertText
          isValid={isValidName}
          invalidText="노선 이름은 2글자 이상 10글자 이하의 한글이어야 합니다."
          placeholder="노선 이름 (2-10글자의 한글)"
          value={form.name}
          onChange={({ target: { value } }) => setName(value)}
        />

        <StyledContainer>
          <SelectBox
            placeholder="상행역"
            value={form.upStationId}
            defaultValue={INVALID_VALUE}
            onChange={({ target }) => setUpStationId(Number(target.value))}
          >
            <Suspense fallback={true}>
              {(stationsQuery.data as Station[]).map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </Suspense>
          </SelectBox>

          <BidirectionArrowIcon />

          <SelectBox
            placeholder="하행역"
            value={form.downStationId}
            defaultValue={INVALID_VALUE}
            onChange={({ target }) => setDownStationId(Number(target.value))}
            disabled={!isSelectedUpStation}
          >
            <Suspense fallback={true}>
              {availableDownStations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </Suspense>
          </SelectBox>
        </StyledContainer>

        <StyledInput
          placeholder="거리"
          type="number"
          min="0"
          value={form.distance}
          onChange={({ target }) => setDistance(target.valueAsNumber)}
        />
        <div>노선 색상</div>
        <Suspense fallback={true}>
          <ColorPicker>
            {lineColors.map((lineColor) => (
              <ColorSelectButton
                type="button"
                selectedColor={form.color}
                backgroundColor={lineColor}
                onClick={() => setColor(lineColor)}
                disabled={linesQuery.data?.some(
                  (line) => line.color === lineColor
                )}
              />
            ))}
          </ColorPicker>
        </Suspense>
        <Button disabled={!isValidForm}>노선 만들기</Button>
      </LineAddForm>
    </Modal>
  );
};

export default LineAddModal;
