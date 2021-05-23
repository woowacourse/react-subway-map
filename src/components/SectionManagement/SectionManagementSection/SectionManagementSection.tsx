import SelectBox from '../../@common/SelectBox/SelectBox';
import Title from '../../@common/Title/Title.styles';
import StationList from '../../StationManagement/StationList/StationList';
import {
  LineSelectBox,
  SectionAddButton,
  StyledSectionManagementSection,
} from './SectionsManagementSection.styles';

const SectionManagementSection = () => {
  return (
    <StyledSectionManagementSection type="vertical">
      <Title>구간 관리</Title>
      <SectionAddButton>구간추가</SectionAddButton>
      <LineSelectBox>
        <option value="신분당선">신분당선</option>
      </LineSelectBox>
      <StationList />
    </StyledSectionManagementSection>
  );
};

export default SectionManagementSection;
