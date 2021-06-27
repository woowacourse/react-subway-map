import { Suspense } from 'react';
import { INVALID_VALUE } from '../../../constants/validate';
import useLine from '../../../service/hooks/useLine';
import useLogin from '../../../service/hooks/useLogin';
import useModal from '../../../service/hooks/useModal';
import useSection from '../../../service/hooks/useSection';
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
  const { accessToken } = useLogin();
  const { linesQuery } = useLine(accessToken);
  const { currentLineId, setCurrentLineId, currentLineDetail, deleteSection } =
    useSection(accessToken);

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <StyledSectionManagementSection type="vertical">
        <Title>구간 관리</Title>
        <SectionAddButton onClick={openModal}>구간추가</SectionAddButton>
        <LineSelectBox
          placeholder="노선 선택"
          value={currentLineId}
          defaultValue={INVALID_VALUE}
          onChange={({ target }) => setCurrentLineId(Number(target.value))}
        >
          <Suspense fallback={true}>
            {(linesQuery.data as Line[]).map((line) => (
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
