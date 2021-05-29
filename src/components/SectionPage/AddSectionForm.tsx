import { useState } from 'react';
import { Line, Station } from '../../interfaces';
import { AddSectionRequest, LineSection } from '../../interfaces/section';
import Button from '../@commons/Button/Button';
import Modal from '../@commons/Modal/Modal';
import SelectInput from '../@commons/SelectInput/SelectInput';
import * as S from './AddSectionForm.styles';
import SectionModalForm from './SectionModalForm';

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
        <SelectInput initialText='지하철 노선을 선택해주세요.' value={lineSection.id} onChange={handleSelectLine}>
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
            onLineChange={handleSelectLine}
            onModalClose={handleModalClose}
            addSection={addSection}
          />
        </Modal>
      )}
    </S.AddSectionForm>
  );
};

export default AddSectionForm;
