import { SESSION_STORAGE_KEY } from '../../constants/storage';

export const isLoginInMock = false;

const sessionStorage = {
  [SESSION_STORAGE_KEY.ACCESS_TOKEN]: 'sessionAccessTokenTest',
  [SESSION_STORAGE_KEY.API_OWNER]: 'JAYON',
};

export const getSessionStorageItem = jest.fn((key: string): string => {
  return sessionStorage[key];
});
