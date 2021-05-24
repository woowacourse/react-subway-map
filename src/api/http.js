import { BASE_URL } from "./constants";

const post = async (endpoint, options) => {
  const { method, headers, body, ...rest } = options;

  return fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    ...rest,
  });
};

const http = { post };

export default http;
