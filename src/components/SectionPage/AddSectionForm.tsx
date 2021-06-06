import { useState } from 'react';
import Button from '../@commons/Button/Button';
import SelectInput from '../@commons/SelectInput/SelectInput';
import Modal from '../@commons/Modal/Modal';
import SectionModalForm from './SectionModalForm';
import { Line, Station } from '../../interfaces';
import { AddSectionRequest, LineSection } from '../../interfaces/section';
import * as S from './AddSectionForm.styles';

interface Props {
  lineSection: LineSection;
  lines: Line[];
  stations: Station[];
  getLineSection: (id: Line['id']) => void;
  addSection: (section: AddSectionRequest) => void;
}

const AddSectionForm = ({ lineSection, lines, stations, getLineSection, addSection }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectLine = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getLineSection(Number(e.target.value));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <S.AddSectionForm>
      <S.Title>지하철 구간 관리</S.Title>
      <S.InputWrapper>
        <SelectInput initialText='지하철 노선을 선택해주세요.' value={lineSection.id} onChange={handleSelectLine}>
          {lines.map(line => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </SelectInput>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button shape='CIRCLE' type='button' onClick={handleOpenModal}>
          +
        </Button>
      </S.ButtonWrapper>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <SectionModalForm
            lineSection={lineSection}
            lines={lines}
            stations={stations}
            onSelectLine={handleSelectLine}
            onCloseModal={handleCloseModal}
            addSection={addSection}
          />
        </Modal>
      )}
    </S.AddSectionForm>
  );
};

export default AddSectionForm;
