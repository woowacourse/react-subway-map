import { Member } from './../types';
import axios, { AxiosResponse } from 'axios';

export const requestSignup = (memberInfo: Member, baseURL: string): Promise<Response> =>
  axios.post(`${baseURL}/members`, memberInfo);

interface LoginResponse {
  accessToken: string;
}

export const requestLogin = (
  loginInfo: Member,
  baseURL: string
): Promise<AxiosResponse<LoginResponse>> => axios.post(`${baseURL}/login/token`, loginInfo);
