import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL, RESPONSE_MESSAGE } from '../../../constants';
import { useGetAllRequest, useGetRequest } from '../../../hooks';
import { RootState } from '../../../store';
import { FullVerticalCenterBox } from '../../../styles/shared';
import { IPathFindRes, IStationRes } from '../../../type';
import { Header } from '../../atoms';
import { PathFindForm, PathMap } from '../../molecules';
import { DistanceText, PathResultWrapper } from './PathFind.styles';

const PathFind = () => {
  const {
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { hostState: state.hostReducer };
  });

  const { allData: stations, getAllData: getAllStations } = useGetAllRequest<IStationRes>(
    BASE_URL.STATION(host),
    RESPONSE_MESSAGE.STATION.GET_ALL_DATA_RESPONSE,
  );

  const { data: pathInfo, getData: findPath } = useGetRequest<IPathFindRes>(
    RESPONSE_MESSAGE.PATH.GET_DATA_RESPONSE,
  );

  const doPathFind = (departmentStationId: number, destStationId: number) => {
    findPath(BASE_URL.PATH(host, departmentStationId, destStationId));
  };

  useEffect(() => {
    getAllStations();
  }, []);

  return (
    <FullVerticalCenterBox>
      <Header>
        <h3>경로찾기</h3>
      </Header>

      <PathFindForm stations={stations} doPathFind={doPathFind} />

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
