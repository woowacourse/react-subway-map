import { Member } from './../types';
import { AxiosResponse } from 'axios';
import customAxios from '../util/API';

export const requestSignup = (memberInfo: Member): Promise<Response> =>
  customAxios.post(`/members`, memberInfo);

interface LoginResponse {
  accessToken: string;
}

export const requestLogin = (loginInfo: Member): Promise<AxiosResponse<LoginResponse>> =>
  customAxios.post(`/login/token`, loginInfo);
