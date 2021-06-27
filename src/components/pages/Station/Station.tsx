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
    addStationWrapper,
    onDeleteStation,
    addStationResponse,
    deleteStationResponse,
  } = useStation(host);

  useEffect(() => {
    getAllStations();
  }, [addStationResponse, deleteStationResponse]);

  return (
    <FullVerticalCenterBox>
      <Header>
        <h3>🚉 역 관리</h3>
      </Header>

      <FormProvider submitFunc={addStationWrapper}>
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
