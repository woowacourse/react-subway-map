import Template from '../../components/@common/Template/Template';
import StationAddForm from '../../components/StationManagement/StationAddForm/StationAddForm';
import StationList from '../../components/StationManagement/StationList/StationList';

const StationManagementPage = (props) => (
  <Template type="vertical">
    <StationAddForm />
    <StationList />
  </Template>
);

export default StationManagementPage;
