import { getBaseURL } from "../pages/Entry/baseURL";

const post = async (endpoint, options) => {
  const { method, headers, body, ...rest } = options;
  const baseURL = getBaseURL();

  return fetch(`${baseURL}${endpoint}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    ...rest,
  });
};

const get = async (endpoint, options) => {
  const { method, headers, body, ...rest } = options;
  const baseURL = getBaseURL();

  return fetch(`${baseURL}${endpoint}`, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    ...rest,
  });
};

const http = { post, get };

export default http;
