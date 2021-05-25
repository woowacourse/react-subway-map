import { Member } from './../types';
import axios from 'axios';

export const requestSignup = (memberInfo: Member, baseURL: string): Promise<Response> =>
  axios.post(`${baseURL}/members`, memberInfo);

export const requestLogin = (loginInfo: Member, baseURL: string): Promise<Response> =>
  axios.post(`${baseURL}/login/token`, loginInfo);
