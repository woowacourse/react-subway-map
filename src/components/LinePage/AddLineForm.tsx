import { useEffect, useState } from 'react';
import Button from '../@commons/Button/Button';
import Input from '../@commons/Input/Input';
import Modal from '../@commons/Modal/Modal';
import LineModalForm from './LineModalForm';
import { AddLineRequest, Line, Station } from '../../interfaces';
import { getLineNameErrorMessage } from './LineModalForm.validation';
import subwaySVG from '../../assets/svg/subway.svg';
import * as S from './AddLineForm.styles';
import { VALIDATION } from '../../constants/validation';

interface Props {
  lines: Line[];
  stations: Station[];
  addLine: (newLine: AddLineRequest) => void;
}

const initLineInfo = {
  name: '',
  color: '',
  upStationId: '',
  downStationId: '',
  distance: '',
};

const AddLineForm = ({ lines, stations, addLine }: Props) => {
  const [lineInfo, setLineInfo] = useState(initLineInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lineNameErrorMessage = getLineNameErrorMessage(lineInfo.name, lines);
  const isValidNameForm = !lineNameErrorMessage;

  useEffect(() => {
    if (lines.length === 0) return;
    handleCloseModal();
  }, [lines.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | React.MouseEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const lastInput = value?.slice(-1)[0];

    if (lastInput === VALIDATION.EMPTY_INPUT) return;
    setLineInfo({ ...lineInfo, [name]: value });
  };

  const handleAddNewLineName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidNameForm) return;

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setLineInfo(initLineInfo);
    setIsModalOpen(false);
  };

  const handleAddLine = (isValidForm: boolean, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidForm) return;

    addLine(lineInfo);
  };

  return (
    <S.AddLineForm onSubmit={handleAddNewLineName}>
      <S.Title>지하철 노선 관리</S.Title>
      <S.InputWrapper>
        <Input
          value={lineInfo.name}
          name='name'
          emoji={subwaySVG}
          label='지하철 노선 이름을 입력해주세요.'
          onChange={handleChange}
          required
        />
        <S.ButtonWrapper>
          <Button isDisabled={!isValidNameForm}>추가</Button>
        </S.ButtonWrapper>
      </S.InputWrapper>
      <S.Message>{lineInfo.name && lineNameErrorMessage}</S.Message>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <LineModalForm
            lines={lines}
            lineInfo={lineInfo}
            onChange={handleChange}
            onSubmit={handleAddLine}
            stations={stations}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )}
    </S.AddLineForm>
  );
};

export default AddLineForm;
