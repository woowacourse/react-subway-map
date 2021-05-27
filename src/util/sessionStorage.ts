export const getSessionStorageItem = (key: string): string | null => sessionStorage.getItem(key);

export const setSessionStorageItem = (key: string, value: string): void => {
  sessionStorage.setItem(key, value);
};

export const removeSessionStorageItem = (key: string): void => {
  sessionStorage.removeItem(key);
};
