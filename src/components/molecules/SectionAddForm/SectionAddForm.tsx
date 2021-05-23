import { ILineRes, AddFormProps } from '../../../type';
import { Button, Input, Select } from '../../atoms';
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
  return (
    <Container onSubmit={onSubmitSectionInfo}>
      <Select
        defaultName="구간을 추가할 노선을 선택해주세요"
        options={lineList}
        onChange={onChangeLine}
        value={lineId}
      />
      <Wrapper>
        <Select
          defaultName="이전역"
          options={addFormProps.stationList}
          onChange={addFormProps.onChangeUpStation}
          value={addFormProps.upStation}
        />
        <Select
          defaultName="다음역"
          options={addFormProps.stationList}
          onChange={addFormProps.onChangeDownStation}
          value={addFormProps.downStation}
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
