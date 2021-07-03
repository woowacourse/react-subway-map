import { ILineRes, IStationRes } from '../../../type';
import { Button, Input, Select } from '../../atoms';
import { IOption } from '../../atoms/Select/Select';
import { Container, Wrapper } from './SectionAddForm.styles';

export interface SectionAddFormProps {
  stationList: IStationRes[];
  lineList: ILineRes[];
  onSubmitSectionInfo: React.FormEventHandler<HTMLFormElement>;

  onChangeLine: React.ChangeEventHandler<HTMLSelectElement>;
  lineId: number;
  onChangeUpStation: React.ChangeEventHandler<HTMLSelectElement>;
  upStation: number;
  onChangeDownStation: React.ChangeEventHandler<HTMLSelectElement>;
  downStation: number;
  onChangeDistance: React.ChangeEventHandler<HTMLInputElement>;
  distance: number;
}

const SectionAddForm = ({
  stationList,
  lineList,
  onChangeLine,
  lineId,
  onChangeUpStation,
  upStation,
  onChangeDownStation,
  downStation,
  onChangeDistance,
  distance,
  onSubmitSectionInfo,
}: SectionAddFormProps) => {
  const lineOptions: IOption[] = lineList.map(({ id, name }) => ({
    value: id,
    name,
  }));

  const stationOptionsWithSelectedLine: IOption[] =
    lineList
      .find(line => line.id === lineId)
      ?.stations.map(station => ({
        value: station.id,
        name: station.name,
      })) || [];

  const stationOptions: IOption[] =
    stationList.map(({ id, name }) => ({
      value: id,
      name,
    })) || [];

  return (
    <Container onSubmit={onSubmitSectionInfo}>
      <Select
        defaultName="구간을 추가할 노선을 선택해주세요"
        options={lineOptions}
        onChange={onChangeLine}
      />
      <Wrapper>
        <Select
          name="upStation"
          defaultName="출발역"
          options={stationOptionsWithSelectedLine}
          onChange={onChangeUpStation}
        />
        <Select
          name="downStation"
          defaultName="다음역"
          options={stationOptions}
          onChange={onChangeDownStation}
        />
      </Wrapper>
      <Input
        name="distance"
        type="text"
        onChange={onChangeDistance}
        value={distance}
        placeholder="거리 (km)"
      />

      <Button>확인</Button>
    </Container>
  );
};

export default SectionAddForm;
