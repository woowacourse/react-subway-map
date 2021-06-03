import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL, RESPONSE_MESSAGE } from '../../../constants';
import { useChangeEvent, useGetAllRequest, useGetRequest } from '../../../hooks';
import { RootState } from '../../../store';
import { FullVerticalCenterBox } from '../../../styles/shared';
import { IPathFindRes, IStationRes } from '../../../type';
import { Button, Header, Select } from '../../atoms';
import { IOption } from '../../atoms/Select/Select';
import { PathMap } from '../../molecules';
import { PathFindForm, SelectWrapper, PathResultWrapper, DistanceText } from './PathFind.styles';

const PathFind = () => {
  const {
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { hostState: state.hostReducer };
  });

  const { allData: stations, getAllData: getAllStations } = useGetAllRequest<IStationRes>(
    BASE_URL.STATION(host),
    RESPONSE_MESSAGE.STATION,
  );

  const { data: pathInfo, getData: findPath } = useGetRequest<IPathFindRes>(RESPONSE_MESSAGE.PATH);

  const { value: departmentStationId, onChange: onChangeDepartmentStation } = useChangeEvent('');
  const { value: destStationId, onChange: onChangeDestStation } = useChangeEvent('');

  const optionOfStations: IOption[] =
    stations?.map(station => ({
      value: station.id,
      name: station.name,
    })) || [];

  const onSubmitPathFind: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (departmentStationId === destStationId) {
      window.alert('출발역과 도착역은 같을 수 없습니다.');

      return;
    }

    findPath(BASE_URL.PATH(host, Number(departmentStationId), Number(destStationId)));
  };

  useEffect(() => {
    getAllStations();
  }, []);

  return (
    <FullVerticalCenterBox>
      <Header>
        <h3>경로찾기</h3>
      </Header>

      <PathFindForm onSubmit={onSubmitPathFind}>
        <SelectWrapper>
          <Select
            defaultName="출발역"
            options={optionOfStations}
            onChange={onChangeDepartmentStation}
            selectValue={departmentStationId}
          />
          <Select
            defaultName="도착역"
            options={optionOfStations}
            onChange={onChangeDestStation}
            selectValue={destStationId}
          />
        </SelectWrapper>
        <Button>길 찾기</Button>
      </PathFindForm>

      <PathResultWrapper>
        {pathInfo && (
          <>
            <DistanceText>
              거리: <span>{pathInfo.distance} km</span>
            </DistanceText>

            <PathMap stations={pathInfo?.stations} />
          </>
        )}
      </PathResultWrapper>
    </FullVerticalCenterBox>
  );
};

export default PathFind;
