import { SESSION_STORAGE_KEY } from '../constants/storage';
import { getSessionStorageItem } from '../util/sessionStorage';
import { APIOwnerType, DEFAULT_API_OWNER } from '../constants/API';
import { isMyEnumTypeBy } from '../util/typeGuard';

export const getAPIOwner = (): APIOwnerType => {
  const apiOwner = getSessionStorageItem(SESSION_STORAGE_KEY.API_OWNER);

  if (!isMyEnumTypeBy(APIOwnerType)(apiOwner)) {
    return DEFAULT_API_OWNER;
  }

  return apiOwner;
};

export const getBearerToken = (): string | null =>
  `bearer ${getSessionStorageItem(SESSION_STORAGE_KEY.ACCESS_TOKEN)}` || null;
