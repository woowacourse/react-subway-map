import { useState } from 'react';
import { AddSectionPayload, Line, LineSection, Station } from '../../interfaces';
import Button from '../@commons/Button/Button';
import Modal from '../@commons/Modal/Modal';
import SelectInput from '../@commons/SelectInput/SelectInput';
import * as S from './AddSectionForm.styles';
import SectionModalForm from './SectionModalForm';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  lineSection: LineSection;
  lines: Line[];
  stations: Station[];
  addSection: (payload: AddSectionPayload) => void;
}

const AddSectionForm = ({ onChange, lineSection, lines, stations, addSection }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <S.AddSectionForm>
      <S.Title>지하철 구간 관리</S.Title>
      <S.InputWrapper>
        <SelectInput initialText='지하철 노선을 선택해주세요.' value={lineSection.id} onChange={onChange}>
          {lines.map(line => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </SelectInput>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button shape='CIRCLE' type='button' onClick={handleModalOpen}>
          +
        </Button>
      </S.ButtonWrapper>
      {isModalOpen && (
        <Modal onCloseModal={handleModalClose}>
          <SectionModalForm
            lineSection={lineSection}
            lines={lines}
            stations={stations}
            onLineChange={onChange}
            onModalClose={handleModalClose}
            addSection={addSection}
          />
        </Modal>
      )}
    </S.AddSectionForm>
  );
};

export default AddSectionForm;
