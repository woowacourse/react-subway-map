import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useStation } from '../../../hooks';
import { RootState } from '../../../store';
import { FullVerticalCenterBox, ScrollBox } from '../../../styles/shared';
import { Header } from '../../atoms';
import { FormProvider } from '../../contexts/FormContext/FormContext';
import { ListItem, StationAddForm } from '../../molecules';

const Station = () => {
  const {
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { hostState: state.hostReducer };
  });

  const {
    stations,
    getAllStations,
    addStation,
    addStationResponse,
    deleteStation,
    deleteStationResponse,
  } = useStation(host);

  const onDeleteStation = (stationId: number) => {
    if (!window.confirm('해당 역을 정말로 삭제하시겠습니까?')) return;
    deleteStation(`${stationId}`);
  };

  useEffect(() => {
    getAllStations();
  }, [addStationResponse, deleteStationResponse]);

  return (
    <FullVerticalCenterBox>
      <Header>
        <h3>🚉 역 관리</h3>
      </Header>

      <FormProvider submitFunc={addStation}>
        <StationAddForm />
      </FormProvider>

      <ScrollBox>
        {stations?.map(({ id, name }) => (
          <ListItem key={id} content={name} onClickDelete={() => onDeleteStation(id)} />
        ))}
      </ScrollBox>
    </FullVerticalCenterBox>
  );
};

export default Station;
