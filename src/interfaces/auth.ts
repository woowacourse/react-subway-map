import { loginAsync } from '../modules/user/userReducer';

export type LoginAction = {
  type: typeof loginAsync.type;
  payload: {
    email: string;
    password: string;
  };
};

export interface LoginResult {
  accessToken: string;
}
