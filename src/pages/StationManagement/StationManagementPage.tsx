import Template from '../../components/@common/Template/Template';
import StationAddForm from '../../components/StationManagement/StationAddForm/StationAddForm';
import StationList from '../../components/StationManagement/StationList/StationList';
import useStation from '../../hooks/useStation';
import { Station } from '../../types';

const StationManagementPage = () => {
  const { stations, deleteStation } = useStation();

  return (
    <Template type="vertical">
      <StationAddForm />
      {!stations.isLoading && (
        <StationList
          stations={stations.data as Station[]}
          deleteStation={deleteStation}
        />
      )}
    </Template>
  );
};

export default StationManagementPage;
