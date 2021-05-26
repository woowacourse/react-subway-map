import ColorSelector, { LineColor } from '../ColorSelector/ColorSelector';
import { Container, Wrapper } from './LineEditForm.styles';
import { Button, Input, Select } from '../../atoms';
import { AddFormProps } from '../../../type';
import { IOption } from '../../atoms/Select/Select';

export interface LineEditFormProps {
  onChangeLineName: React.ChangeEventHandler<HTMLInputElement>;
  lineName: string;
  setColor: (color: LineColor) => void;
  onSubmitLineInfo: React.FormEventHandler<HTMLFormElement>;
  addFormProps: AddFormProps;
}
const LineEditForm = ({
  onChangeLineName,
  lineName,
  setColor,
  onSubmitLineInfo,
  addFormProps,
}: LineEditFormProps) => {
  const stationListOptions: IOption[] = addFormProps.stationList.map(({ id, name }) => ({
    value: id,
    name,
  }));

  return (
    <Container onSubmit={onSubmitLineInfo}>
      <Input
        placeholder="노선 이름"
        onChange={onChangeLineName}
        value={lineName}
        minLength={2}
        maxLength={10}
      />

      <>
        <Wrapper>
          <Select
            defaultName="상행선"
            options={stationListOptions}
            onChange={addFormProps.onChangeUpStation}
            selectValue={addFormProps.upStation}
          />
          <Select
            defaultName="하행선"
            options={stationListOptions}
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
      </>

      <ColorSelector setColor={setColor} />
      <Button>확인</Button>
    </Container>
  );
};

export default LineEditForm;
