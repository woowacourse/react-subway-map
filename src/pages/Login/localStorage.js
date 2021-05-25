const LOCAL_STORAGE_KEY = "accessToken";

const EXPIRY_TIME_IN_MS = 60 * 60 * 1000;

export const getSavedAccessToken = () => {
  const { accessToken, createdAt } =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? {};

  if (!accessToken) return null;

  if (Date.now() - createdAt > EXPIRY_TIME_IN_MS) return null;

  return accessToken;
};

export const saveAccessToken = (accessToken) => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ accessToken, createdAt: Date.now() })
  );
};
