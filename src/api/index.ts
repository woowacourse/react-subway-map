import { API_RESULT } from '../constants/api';
import { HTTPResponse } from '../interfaces';

interface ResultResponse<T = any> {
  data?: T;
  message?: string;
}

export const successResponse = (response?: ResultResponse): HTTPResponse => {
  return Object.assign(API_RESULT.SUCCESS, response);
};

export const failureResponse = (response?: ResultResponse): HTTPResponse => {
  return Object.assign(API_RESULT.FAILURE, response);
};
