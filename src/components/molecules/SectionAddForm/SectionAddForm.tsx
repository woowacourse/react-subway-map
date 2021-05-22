import { IStation, ILine } from '../../../type';
import { Button, Input, Select } from '../../atoms';
import { Container, Wrapper } from './SectionAddForm.styles';

export interface SectionAddFormProps {
  lineList: ILine[];
  onChangeLine: React.ChangeEventHandler<HTMLSelectElement>;
  lineName: string;
  stationList: IStation[];
  onChangeUpStation: React.ChangeEventHandler<HTMLSelectElement>;
  upStation: string;
  onChangeDownStation: React.ChangeEventHandler<HTMLSelectElement>;
  downStation: string;
  onChangeDistance: React.ChangeEventHandler<HTMLInputElement>;
  distance: number;
  onSubmitSectionInfo: React.FormEventHandler<HTMLFormElement>;
}

const SectionAddForm = ({
  lineList,
  onChangeLine,
  lineName,
  stationList,
  onChangeUpStation,
  upStation,
  onChangeDownStation,
  downStation,
  onChangeDistance,
  distance,
  onSubmitSectionInfo,
}: SectionAddFormProps) => {
  return (
    <Container onSubmit={onSubmitSectionInfo}>
      <Select
        defaultName="구간을 추가할 노선을 선택해주세요"
        options={lineList}
        onChange={onChangeLine}
        value={lineName}
      />
      <Wrapper>
        <Select
          defaultName="이전역"
          options={stationList}
          onChange={onChangeUpStation}
          value={upStation}
        />
        <Select
          defaultName="다음역"
          options={stationList}
          onChange={onChangeDownStation}
          value={downStation}
        />
      </Wrapper>
      <Input
        type="number"
        onChange={onChangeDistance}
        value={distance}
        placeholder="거리 (km)"
        min={1}
        max={100}
      />

      <Button>확인</Button>
    </Container>
  );
};

export default SectionAddForm;
