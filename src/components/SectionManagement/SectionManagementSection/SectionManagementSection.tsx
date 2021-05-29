import { Suspense, useEffect } from 'react';
import useLine from '../../../hooks/useLine';
import useModal from '../../../hooks/useModal';
import useSection from '../../../hooks/useSection';
import { Line } from '../../../types';
import Title from '../../@common/Title/Title.styles';
import StationList from '../../StationManagement/StationList/StationList';
import SectionAddModal from '../SectionAddModal/SectionAddModal';
import {
  LineSelectBox,
  SectionAddButton,
  StyledSectionManagementSection,
} from './SectionsManagementSection.styles';

const SectionManagementSection = () => {
  const { lines } = useLine();
  const { currentLineId, setCurrentLineId, currentLineDetail, deleteSection } =
    useSection();

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <StyledSectionManagementSection type="vertical">
        <Title>구간 관리</Title>
        <SectionAddButton onClick={openModal}>구간추가</SectionAddButton>
        <LineSelectBox
          placeholder="노선 선택"
          value={currentLineId}
          defaultValue={-1}
          onChange={({ target }) => setCurrentLineId(Number(target.value))}
        >
          <Suspense fallback={true}>
            {(lines.data as Line[]).map((line) => (
              <option key={line.id} value={line.id}>
                {line.name}
              </option>
            ))}
          </Suspense>
        </LineSelectBox>
        <StationList
          stations={currentLineDetail.stations}
          deleteStation={deleteSection}
        />
        {isModalOpen && <SectionAddModal closeModal={closeModal} />}
      </StyledSectionManagementSection>
    </>
  );
};

export default SectionManagementSection;
