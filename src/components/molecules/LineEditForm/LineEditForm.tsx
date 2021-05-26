import ColorSelector, { LineColor } from '../ColorSelector/ColorSelector';
import { Container, Wrapper } from './LineEditForm.styles';
import { Button, Input, Select } from '../../atoms';
import { IOption } from '../../atoms/Select/Select';
import { IStationRes } from '../../../type.d';

export interface LineAddFormProps {
  stations: IStationRes[];
  onChangeUpStationId: React.ChangeEventHandler<HTMLSelectElement>;
  upStationId: string;
  onChangeDownStationId: React.ChangeEventHandler<HTMLSelectElement>;
  downStationId: string;
  onChangeDistance: React.ChangeEventHandler<HTMLInputElement>;
  distance: string;
}

export interface LineEditFormProps {
  onChangeLineName: React.ChangeEventHandler<HTMLInputElement>;
  lineName: string;
  setColor: (color: LineColor) => void;
  onSubmitLineInfo: React.FormEventHandler<HTMLFormElement>;
  addFormProps: LineAddFormProps | null;
}


// TODO: Select 컨텐츠의 길이에 따라서, Container의 너비가 늘어나는 이슈 수정하기
const LineEditForm = ({
  onChangeLineName,
  lineName,
  setColor,
  onSubmitLineInfo,
  addFormProps,
}: LineEditFormProps) => {
  const stationListOptions: IOption[] =
    addFormProps?.stations.map(({ id, name }) => ({
      value: id,
      name,
    })) || [];

  return (
    <Container onSubmit={onSubmitLineInfo}>
      <Input
        placeholder="노선 이름"
        onChange={onChangeLineName}
        value={lineName}
        minLength={2}
        maxLength={10}
      />

      {addFormProps && (
        <>
          <Wrapper>
            <Select
              defaultName="상행선"
              options={stationListOptions}
              onChange={addFormProps.onChangeUpStationId}
              selectValue={addFormProps.upStationId}
            />
            <Select
              defaultName="하행선"
              options={stationListOptions}
              onChange={addFormProps.onChangeDownStationId}
              selectValue={addFormProps.downStationId}
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
      )}

      <ColorSelector setColor={setColor} />
      <Button>확인</Button>
    </Container>
  );
};

export default LineEditForm;
