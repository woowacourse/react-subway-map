import { BASE_URL, HOST, RESPONSE_MESSAGE } from '../constants';
import { IStationRes } from '../type';
import useServerAPI from './useServerAPI';

type HOST_TYPE = typeof HOST[keyof typeof HOST];

const useStation = (host: HOST_TYPE) => {
  const {
    allData: stations,
    getAllData: getAllStations,
    deleteData: deleteStation,
    postData: addStation,
    postDataResponse: addStationResponse,
    deleteDataResponse: deleteStationResponse,
  } = useServerAPI<IStationRes>(BASE_URL.STATION(host), RESPONSE_MESSAGE.STATION);

  return {
    stations,
    getAllStations,
    addStation,
    addStationResponse,
    deleteStation,
    deleteStationResponse,
  };
};

export default useStation;
