import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { APIOwnerType, APIInfo, API_INFO, DEFAULT_API_OWNER } from '../../constants/API';
import { isMyEnumTypeBy } from '../../util/typeGuard';

const useCurrentAPIInfo = (): APIInfo => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);

  if (!isMyEnumTypeBy(APIOwnerType)(apiOwner)) {
    return API_INFO[DEFAULT_API_OWNER];
  }

  return API_INFO[apiOwner];
};

export default useCurrentAPIInfo;
