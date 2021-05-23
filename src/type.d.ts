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
  upStationId: number;
  downStationId: number;
  distance: number;
}

export interface ILineRes {
  id: number;
  name: string;
  color: string;
  extraFare: number;
  stations: IStationRes[];
  sections: ISectionRes[];
}

export interface ISectionReq {
  upStationId: number;
  downStationId: number;
  distance: number;
}

export interface ISectionRes {
  upStation: IStation;
  downStation: IStation;
  distance: number;
}

export interface AddFormProps {
  stationList: IStation[];
  onChangeUpStation: React.ChangeEventHandler<HTMLSelectElement>;
  upStation: number;
  onChangeDownStation: React.ChangeEventHandler<HTMLSelectElement>;
  downStation: number;
  onChangeDistance: React.ChangeEventHandler<HTMLInputElement>;
  distance: number;
}
