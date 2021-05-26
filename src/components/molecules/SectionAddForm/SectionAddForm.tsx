import { ILineRes, AddFormProps } from '../../../type';
import { Button, Input, Select } from '../../atoms';
import { IOption } from '../../atoms/Select/Select';
import { Container, Wrapper } from './SectionAddForm.styles';

export interface SectionAddFormProps {
  lineList: ILineRes[];
  onChangeLine: React.ChangeEventHandler<HTMLSelectElement>;
  lineId: number;
  onSubmitSectionInfo: React.FormEventHandler<HTMLFormElement>;
  addFormProps: AddFormProps;
}

const SectionAddForm = ({
  lineList,
  onChangeLine,
  lineId,
  addFormProps,
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
          onChange={addFormProps.onChangeUpStation}
          selectValue={addFormProps.upStation}
        />
        <Select
          defaultName="다음역"
          options={lineListOptions}
          onChange={addFormProps.onChangeDownStation}
          selectValue={addFormProps.downStation}
        />
      </Wrapper>
      <Input
        type="number"
        onChange={addFormProps.onChangeDistance}
        value={addFormProps.distance}
        placeholder="거리 (km)"
        min={1}
        max={100}
      />

      <Button>확인</Button>
    </Container>
  );
};

export default SectionAddForm;
