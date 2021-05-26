import axios, { AxiosResponse } from 'axios';
import { Line } from '../types';

export const requestGetLines = (baseURL: string): Promise<AxiosResponse<Line[]>> =>
  axios.get(`${baseURL}/lines`);
