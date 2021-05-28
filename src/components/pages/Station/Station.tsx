import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RESPONSE_MESSAGE } from '../../../constants';
import { useChangeEvent, useServerAPI } from '../../../hooks';
import { RootState } from '../../../store';
import { FullVerticalCenterBox, ScrollBox } from '../../../styles/shared';
import { IStationReq, IStationRes } from '../../../type';
import { isValidStationName } from '../../../utils';
import { Header } from '../../atoms';
import { ListItem, StationAddForm } from '../../molecules';

const Station = () => {
  const {
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { hostState: state.hostReducer };
  });

  const {
    value: stationName,
    setValue: setStationName,
    onChange: onChangeStationName,
  } = useChangeEvent('');

  const {
    allData: stations,
    getAllData: getAllStations,
    deleteData: deleteStation,
    postData: addStation,
    postDataResponse: postStationResponse,
    deleteDataResponse: deleteStationResponse,
  } = useServerAPI<IStationRes>(`${host}/stations`, RESPONSE_MESSAGE.STATION);

  const onSubmitStationInfo: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!isValidStationName(stationName)) {
      window.alert(
        '역 이름은 공백이 포함되지 않은 2자 이상 20자 이하의 한글/숫자로 이루어진 문자열이어야 합니다.',
      );
      setStationName('');

      return;
    }

    const body: IStationReq = {
      name: stationName,
    };

    addStation<IStationReq>(body);
    setStationName('');
  };

  const onDeleteStation = (stationId: number) => {
    if (!window.confirm('해당 역을 정말로 삭제하시겠습니까?')) return;
    deleteStation(`${stationId}`);
  };

  useEffect(() => {
    getAllStations();
  }, [postStationResponse, deleteStationResponse]);

  return (
    <FullVerticalCenterBox>
      <Header>
        <h3>🚉 역 관리</h3>
      </Header>

      <StationAddForm
        stationName={stationName}
        onChangeStationName={onChangeStationName}
        onSubmitStationInfo={onSubmitStationInfo}
      />

      <ScrollBox>
        {stations?.map(({ id, name }) => (
          <ListItem key={id} content={name} onClickDelete={() => onDeleteStation(id)} />
        ))}
      </ScrollBox>
    </FullVerticalCenterBox>
  );
};

export default Station;
