import {
  BASE_URL,
  SIGNUP_STATUS_INFO,
  UNKNOWN_ERROR_MESSAGE,
} from "./constants";

const signup = async ({ email, password, age }) => {
  const data = { email, password, age };

  try {
    const res = await fetch(`${BASE_URL}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    alert(SIGNUP_STATUS_INFO[res.status].MESSAGE);

    if (SIGNUP_STATUS_INFO[res.status].ERROR_TYPE) {
      console.error(SIGNUP_STATUS_INFO[res.status].ERROR_TYPE);
    }

    if (!(res.status in SIGNUP_STATUS_INFO)) {
      const body = await res.json();
      throw new Error(body.message);
    }

    return res.status === 201;
  } catch (error) {
    console.error(error);
    alert(UNKNOWN_ERROR_MESSAGE);
    return false;
  }
};

const membersAPI = { signup };

export default membersAPI;
