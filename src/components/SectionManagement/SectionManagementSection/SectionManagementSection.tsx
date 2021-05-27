import useLine from '../../../hooks/useLine';
import useSection from '../../../hooks/useSection';
import { Line } from '../../../types';
import Title from '../../@common/Title/Title.styles';
import StationList from '../../StationManagement/StationList/StationList';
import {
  LineSelectBox,
  SectionAddButton,
  StyledSectionManagementSection,
} from './SectionsManagementSection.styles';

const SectionManagementSection = () => {
  const { lines } = useLine();
  const { currentLine, setCurrentLine } = useSection();

  return (
    <StyledSectionManagementSection type="vertical">
      <Title>구간 관리</Title>
      <SectionAddButton>구간추가</SectionAddButton>
      <LineSelectBox
        value={currentLine}
        onChange={({ target }) => setCurrentLine(target.value)}
      >
        <option defaultValue="노선 이름" disabled>
          노선 이름
        </option>

        {!lines.isLoading &&
          (lines.data as Line[]).map((line) => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
      </LineSelectBox>
      {/* <StationList /> */}
    </StyledSectionManagementSection>
  );
};

export default SectionManagementSection;
