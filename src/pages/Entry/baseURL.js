const LOCAL_STORAGE_KEY = "dongtan/baseURL";

const createBaseURL = () => {
  let baseURL =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ??
    "https://gump-subway.p-e.kr";

  const getBaseURL = () => baseURL;

  const setBaseURL = (url) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(url));
    baseURL = url;
  };

  return { getBaseURL, setBaseURL };
};

export const { getBaseURL, setBaseURL } = createBaseURL();
