import { BASE_URL, HOST, RESPONSE_MESSAGE } from '../constants';
import { ISectionRes } from '../type';
import useServerAPI from './useServerAPI';

type HOST_TYPE = typeof HOST[keyof typeof HOST];

const useSection = (host: HOST_TYPE) => {
  const {
    postData: addSection,
    postDataResponse: addSectionResponse,

    deleteData: deleteSection,
    deleteDataResponse: deleteSectionResponse,
  } = useServerAPI<ISectionRes>(BASE_URL.LINE(host), RESPONSE_MESSAGE.SECTION);

  return {
    addSection,
    addSectionResponse,
    deleteSection,
    deleteSectionResponse,
  };
};

export default useSection;
