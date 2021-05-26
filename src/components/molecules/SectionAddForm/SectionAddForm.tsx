import { ILineRes } from '../../../type';
import { Button, Input, Select } from '../../atoms';
import { IOption } from '../../atoms/Select/Select';
import { Container, Wrapper } from './SectionAddForm.styles';

export interface SectionAddFormProps {
  lineList: ILineRes[];
  onChangeLine: React.ChangeEventHandler<HTMLSelectElement>;
  lineId: number;
  onSubmitSectionInfo: React.FormEventHandler<HTMLFormElement>;
  onChangeUpStation: React.ChangeEventHandler<HTMLSelectElement>;
  upStation: number;
  onChangeDownStation: React.ChangeEventHandler<HTMLSelectElement>;
  downStation: number;
  onChangeDistance: React.ChangeEventHandler<HTMLInputElement>;
  distance: number;
}

const SectionAddForm = ({
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
  const lineListOptions: IOption[] = lineList.map(({ id, name }) => ({
    value: id,
    name,
  }));

  return (
    <Container onSubmit={onSubmitSectionInfo}>
      <Select
        defaultName="구간을 추가할 노선을 선택해주세요"
        options={lineListOptions}
        onChange={onChangeLine}
        selectValue={lineId}
      />
      <Wrapper>
        <Select
          defaultName="이전역"
          options={lineListOptions}
          onChange={onChangeUpStation}
          selectValue={upStation}
        />
        <Select
          defaultName="다음역"
          options={lineListOptions}
          onChange={onChangeDownStation}
          selectValue={downStation}
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
