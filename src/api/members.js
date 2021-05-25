import http from "./http";
import {
  ENDPOINT,
  SIGNUP_STATUS_INFO,
  UNKNOWN_ERROR_MESSAGE,
} from "./constants";

const login = async ({ email, password }) => {
  try {
    const response = await http.post(ENDPOINT.LOGIN, {
      body: { email, password },
    });

    if (response.status === 200) {
      const { accessToken } = await response.json();

      alert(SIGNUP_STATUS_INFO[200].MESSAGE);

      return accessToken;
    }

    alert(SIGNUP_STATUS_INFO[response.status].MESSAGE);

    if (SIGNUP_STATUS_INFO[response.status].ERROR_TYPE) {
      console.error(SIGNUP_STATUS_INFO[response.status].ERROR_TYPE);
    }

    if (!(response.status in SIGNUP_STATUS_INFO)) {
      const body = await response.json();

      throw new Error(body.message);
    }

    return null;
  } catch (error) {
    console.error(error);
    alert(UNKNOWN_ERROR_MESSAGE);

    return null;
  }
};

const membersAPI = { login };

export default membersAPI;
