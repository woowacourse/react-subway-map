import { useState } from 'react';
import * as S from './AddSectionForm.styles';

import Button from '../../@commons/Button/Button';
import Modal from '../../@commons/Modal/Modal';
import SelectInput from '../../@commons/SelectInput/SelectInput';

import SectionModalForm from '../SectionModalForm/SectionModalForm';
import { AddSectionAction, SectionState } from '../../../interfaces/section';
import { LineState } from '../../../interfaces/line';
import { StationState } from '../../../interfaces/station';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  lineSection: SectionState['lineSection'];
  lines: LineState['lines'];
  stations: StationState['stations'];
  addSection: (payload: AddSectionAction['payload']) => void;
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
        <SelectInput
          initialText='지하철 노선을 선택해주세요.'
          value={lineSection.id}
          onChange={onChange}
          error={!lineSection.id ? true : false}
        >
          {lines.map(line => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </SelectInput>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button type='button' onClick={handleModalOpen}>
          구간추가
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
