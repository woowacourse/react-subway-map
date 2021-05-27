import { FormEvent, VFC } from 'react';
import useLine from '../../../hooks/useLine';
import useStation from '../../../hooks/useStation';
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
} from './LineAddModal.styles';

export interface LineAddModalProps {
  closeModal: () => void;
}

const LineAddModal: VFC<LineAddModalProps> = ({ closeModal }) => {
  const { stations } = useStation();

  const {
    name,
    color,
    upStationId,
    downStationId,
    distance,
    setName,
    setDistance,
    setUpStationId,
    setDownStationId,
    setColor,
    addLine,
  } = useLine();

  const handleAddLine = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addLine();
    closeModal();
  };

  return (
    <Modal size="medium" closeModal={closeModal}>
      <Title>노선 생성</Title>
      <LineAddForm onSubmit={handleAddLine}>
        <StyledInput
          placeholder="노선 이름"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />

        <StyledContainer>
          <SelectBox
            value={upStationId}
            onChange={({ target }) => setUpStationId(Number(target.value))}
          >
            <option defaultValue="상행역" disabled selected hidden>
              상행역
            </option>
            {!stations.isLoading &&
              (stations.data as Station[]).map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
          </SelectBox>

          <BidirectionArrowIcon />

          <SelectBox
            placeholder="하행 종점"
            value={downStationId}
            onChange={({ target }) => setDownStationId(Number(target.value))}
          >
            <option defaultValue="하행역" disabled selected hidden>
              하행역
            </option>
            {stations &&
              !stations.isLoading &&
              (stations.data as Station[]).map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
          </SelectBox>
        </StyledContainer>

        <StyledInput
          placeholder="거리"
          type="number"
          value={distance}
          onChange={({ target: { valueAsNumber } }) =>
            setDistance(valueAsNumber)
          }
        />

        <StyledInput
          placeholder="노선 색상"
          value={color}
          onChange={({ target: { value } }) => setColor(value)}
        />

        <Button>노선 만들기</Button>
      </LineAddForm>
    </Modal>
  );
};

export default LineAddModal;
