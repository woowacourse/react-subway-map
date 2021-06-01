import { Member } from './../types';
import axios, { AxiosResponse } from 'axios';
interface LoginResponse {
  accessToken: string;
}

export const requestSignup = (memberInfo: Member): Promise<AxiosResponse> =>
  axios.post(`/members`, memberInfo);

export const requestEmailCheck = (email: string): Promise<AxiosResponse> =>
  axios.post('/members/email-check', { email });

export const requestLogin = (loginInfo: Member): Promise<AxiosResponse<LoginResponse>> =>
  axios.post(`/login/token`, loginInfo);
