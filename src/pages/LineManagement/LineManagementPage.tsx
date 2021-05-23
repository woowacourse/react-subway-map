import Template from '../../components/@common/Template/Template';
import Title from '../../components/@common/Title/Title.styles';
import LineList from '../../components/LineManagement/LineManagementSection/LineList/LineList';
import { LineAddButton } from '../../components/LineManagement/LineManagementSection/LineManagementSection.styles';

const LineManagementPage = () => {
  return (
    <Template type="vertical">
      <Title>노선관리</Title>
      <LineAddButton>노선 추가</LineAddButton>
      <LineList />
    </Template>
  );
};

export default LineManagementPage;
