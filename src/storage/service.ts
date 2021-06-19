import { SESSION_STORAGE_KEY } from '../constants/storage';
import { getSessionStorageItem } from '../util/sessionStorage';
import { DEFAULT_API_OWNER } from './../constants/api';

export const getApiOwner = (): string =>
  getSessionStorageItem(SESSION_STORAGE_KEY.API_OWNER) || DEFAULT_API_OWNER;

export const getBearerToken = (): string | null =>
  `bearer ${getSessionStorageItem(SESSION_STORAGE_KEY.ACCESS_TOKEN)}` || null;
