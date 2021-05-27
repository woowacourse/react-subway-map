import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { ROUTE } from '../../../constants';
import { useChangeEvent, useServerAPI } from '../../../hooks';
import { RootState } from '../../../store';
import { IStationReq, IStationRes } from '../../../type';
import { Header } from '../../atoms';
import { ListItem, StationAddForm } from '../../molecules';
import { Container } from './Station.styles';

// TODO: 역 이름 유효성 검사 코드 추가
// TODO: 역 이름 유효성 검사가 백엔드 API 마다 다른지 검사
const Station = () => {
  const {
    value: stationName,
    setValue: setStationName,
    onChange: onChangeStationName,
  } = useChangeEvent('');

  const {
    signedUser: { id: signedUserId },
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { signedUser: state.signedUserReducer, hostState: state.hostReducer };
  });

  const {
    allData: stations,
    getAllData: getAllStations,
    deleteData: deleteStation,
    postData: addStation,
    getAllDataResponse: getAllStationResponse,
    postDataResponse: postStationResponse,
    deleteDataResponse: deleteStationResponse,
  } = useServerAPI<IStationRes>(`${host}/stations`);

  if (!signedUserId) {
    window.alert('로그인이 필요합니다.');
    return <Redirect to={ROUTE.LOGIN} />;
  }

  const onSubmitStationInfo: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const body: IStationReq = {
      name: stationName,
    };

    addStation<IStationReq>(body);
    setStationName('');
  };

  const onDeleteStation = (stationId: number) => {
    if(!window.confirm('해당 역을 정말로 삭제하시겠습니까?')) return;
    deleteStation(`${stationId}`)}

  useEffect(() => {
    getAllStations();
  }, [postStationResponse, deleteStationResponse]);

  useEffect(() => {
    if (getAllStationResponse?.isError === true) {
      window.alert(getAllStationResponse.message);
    }
  }, [getAllStationResponse]);

  useEffect(() => {
    if (postStationResponse?.isError === true) {
      window.alert(postStationResponse.message);
    } else if (postStationResponse?.isError === false) {
      window.alert('지하철역이 성공적으로 추가되었습니다.');
    }
  }, [postStationResponse]);

  useEffect(() => {
    if (deleteStationResponse?.isError === true) {
      window.alert(deleteStationResponse.message);
    } else if (deleteStationResponse?.isError === false) {
      window.alert('지하철역이 성공적으로 삭제되었습니다.');
    }
  }, [deleteStationResponse]);

  return (
    <Container>
      <Header>
        <h3>🚉 역 관리</h3>
      </Header>

      <StationAddForm
        stationName={stationName}
        onChangeStationName={onChangeStationName}
        onSubmitStationInfo={onSubmitStationInfo}
      />

      <div>
        {stations?.map(({ id, name }) => {
          return <ListItem key={id} content={name} onClickDelete={() => {onDeleteStation(id)}} />;
        })}
      </div>
    </Container>
  );
};

export default Station;
