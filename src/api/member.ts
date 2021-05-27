import { Member } from './../types';
import axios, { AxiosResponse } from 'axios';

export const requestSignup = (memberInfo: Member): Promise<Response> =>
  axios.post(`/members`, memberInfo);

interface LoginResponse {
  accessToken: string;
}

export const requestLogin = (loginInfo: Member): Promise<AxiosResponse<LoginResponse>> =>
  axios.post(`/login/token`, loginInfo);
