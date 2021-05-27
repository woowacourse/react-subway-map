import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeEvent, useServerAPI } from '../../../hooks';
import { RootState } from '../../../store';
import { IStationReq, IStationRes } from '../../../type';
import { Header } from '../../atoms';
import { ListItem, StationAddForm } from '../../molecules';
import { Container } from './Station.styles';

const isValidStationName = (stationName: string) => {
  return /^[가-힣0-9]{2,20}$/.test(stationName);
};

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
    getAllDataResponse: getAllStationResponse,
    postDataResponse: postStationResponse,
    deleteDataResponse: deleteStationResponse,
  } = useServerAPI<IStationRes>(`${host}/stations`);

  const onSubmitStationInfo: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!isValidStationName(stationName)) {
      window.alert(
        '역 이름은 공백이 포함되지 않은 2자 이상 2자 이하의 한글/숫자로 이루어진 문자열이어야 합니다.',
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
          return (
            <ListItem
              key={id}
              content={name}
              onClickDelete={() => {
                onDeleteStation(id);
              }}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Station;
