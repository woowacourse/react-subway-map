export interface IStation {
  id: number;
  name: string;
}

export interface ILine {
  id: number;
  name: string;
  upStationId: number;
  downStationId: number;
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
