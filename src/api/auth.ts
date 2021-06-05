import axios from 'axios';
import { API, RESPONSE } from '../constants/api';
import { HttpResponse } from './../interfaces/request';
import { SignInRequest, SignUpRequest } from '../interfaces';

export const authAPI = {
  signUp: async ({ url, ...data }: SignUpRequest): Promise<HttpResponse<string>> => {
    const response = await axios.post(`${url}/members`, data);

    if (response.status === 400) {
      return { data: response.data, error: '이미 가입된 이메일입니다.' };
    }

    if (response.status > 400) {
      return { data: response.data, error: '회원가입에 실패하였습니다.' };
    }

    return { data: RESPONSE.SUCCESS, error: null };
  },

  signIn: async (data: SignInRequest): Promise<HttpResponse<string>> => {
    const response = await axios.post(API.SIGN_IN(), data);
    if (!response.data.accessToken) {
      return { data: response.data, error: '로그인에 실패하였습니다.' };
    }

    return { data: response.data.accessToken, error: null };
  },
};
