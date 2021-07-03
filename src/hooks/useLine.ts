import { BASE_URL, HOST, RESPONSE_MESSAGE } from '../constants';
import { ILineRes } from '../type';
import useServerAPI from './useServerAPI';

type HOST_TYPE = typeof HOST[keyof typeof HOST];

const useLine = (host: HOST_TYPE) => {
  const {
    allData: lines,
    getAllData: getAllLines,

    postData: addLine,
    postDataResponse: addLineResponse,

    putData: editLine,
    putDataResponse: editLineResponse,

    deleteData: deleteLine,
    deleteDataResponse: deleteLineResponse,
  } = useServerAPI<ILineRes>(BASE_URL.LINE(host), RESPONSE_MESSAGE.LINE);

  return {
    lines,
    getAllLines,
    addLine,
    addLineResponse,
    editLine,
    editLineResponse,
    deleteLine,
    deleteLineResponse,
  };
};

export default useLine;
