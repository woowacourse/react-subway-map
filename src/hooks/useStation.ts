import { BASE_URL, HOST, RESPONSE_MESSAGE } from '../constants';
import { IStationRes } from '../type';
import { isValidStationName } from '../utils';
import useServerAPI from './useServerAPI';

type HOST_TYPE = typeof HOST[keyof typeof HOST];
interface AddStationFormState {
  stationName: {
    value: string;
  };
}

const useStation = (host: HOST_TYPE) => {
  const {
    allData: stations,
    getAllData: getAllStations,
    deleteData: deleteStation,
    postData: addStation,
    postDataResponse: addStationResponse,
    deleteDataResponse: deleteStationResponse,
  } = useServerAPI<IStationRes>(BASE_URL.STATION(host), RESPONSE_MESSAGE.STATION);

  const onDeleteStation = (stationId: number) => {
    if (!window.confirm('해당 역을 정말로 삭제하시겠습니까?')) return;
    deleteStation(`${stationId}`);
  };

  const addStationWrapper = (formContextState: unknown) => {
    const {
      stationName: { value: name },
    } = formContextState as AddStationFormState;

    if (!isValidStationName(name)) {
      window.alert(
        '역 이름은 공백이 포함되지 않은 2자 이상 20자 이하의 한글/숫자로 이루어진 문자열이어야 합니다.',
      );

      return;
    }

    const body = {
      name,
    };

    addStation(body);
  };

  return {
    stations,
    getAllStations,
    onDeleteStation,
    addStationWrapper,
    addStationResponse,
    deleteStationResponse,
  };
};

export default useStation;
