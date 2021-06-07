import Cookies from 'js-cookie';

import { ACCESS_TOKEN, SERVER_ID, SERVER_LIST } from '../constants';

const getBaseUrl = () => SERVER_LIST[Cookies.get(SERVER_ID)].baseUrl;

const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN)}`,
});

const getHeadersWithoutAccessToken = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

export const requestGet = async (path) => {
  return await fetch(`${getBaseUrl()}${path}`, {
    method: 'GET',
    headers: getHeaders(),
  });
};

export const requestPost = async (path, data) => {
  return await fetch(`${getBaseUrl()}${path}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
};

export const requestPostWithoutAccessToken = async (path, data) => {
  return await fetch(`${getBaseUrl()}${path}`, {
    method: 'POST',
    headers: getHeadersWithoutAccessToken(),
    body: JSON.stringify(data),
  });
};

export const requestDelete = async (path) => {
  return await fetch(`${getBaseUrl()}${path}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
};
