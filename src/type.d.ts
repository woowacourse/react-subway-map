export type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface IResMeta {
  isError: boolean;
  message: string;
}

export type ModeType = 'ADD' | 'EDIT' | 'LOOKUP';
export interface ILoginReq {
  email: string;
  password: string;
}

export interface ILoginRes {
  accessToken: string;
}

export interface ISignUpReq {
  email: string;
  password: string;
  age: number;
}

export interface IMyInfoRes {
  id: number;
  email: string;
  age: number;
}

export interface IStationReq {
  name: string;
}

export interface IStationRes {
  id: number;
  name: string;
}

export interface ILineReq {
  name: string;
  color: string;
  upStationId?: number;
  downStationId?: number;
  distance?: number;
}

export interface ILineRes {
  id: number;
  name: string;
  color: string;
  extraFare?: number;
  stations: IStationRes[];
  sections: ISectionRes[];
}

export interface ISectionReq {
  upStationId: number;
  downStationId: number;
  distance: number;
}

export interface ISectionRes {
  upStation: IStationRes;
  downStation: IStationRes;
  distance: number;
}

export type REQUEST_TYPE = 'get' | 'post' | 'put' | 'delete';

type ResultMessageKeyType =
  | 'GET_ALL_DATA_RESPONSE'
  | 'GET_DATA_RESPONSE'
  | 'POST_DATA_RESPONSE'
  | 'DELETE_RESPONSE'
  | 'PUT_RESPONSE';

export type ResultMessage = Partial<
  {
    [key in ResultMessageKeyType]: {
      success: string;
      fail: string;
    };
  }
>;
