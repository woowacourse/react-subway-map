import API from "./constants";

const createBaseURL = () => {
  let baseURL = API["검프"];

  const getBaseURL = () => baseURL;

  const setBaseURL = (url) => {
    baseURL = url;
  };

  return { getBaseURL, setBaseURL };
};

export const { getBaseURL, setBaseURL } = createBaseURL();
