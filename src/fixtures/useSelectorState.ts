import { HOST } from '../constants';

export const validSignedUser = {
  id: 1,
  email: '123@123.com',
  age: 24,

  isError: false,
  status: 200,
};
export const unValidSignedUser = {
  id: null,
  email: null,
  age: null,

  isError: true,
  status: 400,
};

export const validAccessTokenState = {
  accessToken: 'Acadsfkld23213',

  isError: null,
  status: 500,
};
export const unValidAccessTokenState = {
  accessToken: null,

  isError: true,
  status: null,
};

export const validHostState = {
  host: HOST['김김'],
};

export const unValidHostState = {
  host: '',
};
