import { Line, Section, Station, User } from '../types';

interface APIReturnType<T> {
  isSucceeded: boolean;
  message: string;
  result: T;
}

interface RestReturnType {
  auth: boolean;
}

interface RestReturnTypePost extends RestReturnType {
  duplicated: boolean;
}

interface RestReturnTypeDelete extends RestReturnType {}

interface RequestTypeLogin {
  email: string;
  password: string;
}

interface RequestTypeSignUp {
  email: string;
  age: number;
  password: string;
}

interface RequestTypeStation {
  name: string;
}

interface RequestTypeLine {
  name: string;
  color: string;
  upStationId: number;
  downStationId: number;
  distance: number;
}

interface RequestTypeSection {
  upStationId: number;
  downStationId: number;
  distance: number;
}

interface ResponseTypeUser extends User {}

interface ResponseTypeStation extends Station {}

interface ResponseTypeLine extends Line {}

interface ResponseTypeSection extends Section {}

export type {
  APIReturnType,
  RestReturnType,
  RestReturnTypePost,
  RestReturnTypeDelete,
  RequestTypeLogin,
  RequestTypeSignUp,
  RequestTypeStation,
  RequestTypeLine,
  ResponseTypeUser,
  RequestTypeSection,
  ResponseTypeStation,
  ResponseTypeLine,
  ResponseTypeSection,
};
