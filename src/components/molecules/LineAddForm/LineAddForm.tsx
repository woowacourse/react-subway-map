import { IStation } from '../../../type';
import { Button, Input, Select } from '../../atoms';
import ColorSelector, { LineColor } from '../ColorSelector/ColorSelector';
import { Container, Wrapper } from './LineAddForm.styles';

export interface LineAddFormProps {
  onChangeLineName: React.ChangeEventHandler<HTMLInputElement>;
  lineName: string;
  stationList: IStation[];
  onChangeUpStation: React.ChangeEventHandler<HTMLSelectElement>;
  upStation: string;
  onChangeDownStation: React.ChangeEventHandler<HTMLSelectElement>;
  downStation: string;
  onChangeDistance: React.ChangeEventHandler<HTMLInputElement>;
  distance: number;
  setColor: (color: LineColor) => void;
  onSubmitLineInfo: React.FormEventHandler<HTMLFormElement>;
}

const LineAddForm = ({
  onChangeLineName,
  lineName,
  stationList,
  onChangeUpStation,
  upStation,
  onChangeDownStation,
  downStation,
  onChangeDistance,
  distance,
  setColor,
  onSubmitLineInfo,
}: LineAddFormProps) => {
  return (
    <Container onSubmit={onSubmitLineInfo}>
      <Input
        placeholder="노선 이름"
        onChange={onChangeLineName}
        value={lineName}
        minLength={2}
        maxLength={10}
      />
      <Wrapper>
        <Select
          defaultName="상행선"
          options={stationList}
          onChange={onChangeUpStation}
          value={upStation}
        />
        <Select
          defaultName="하행선"
          options={stationList}
          onChange={onChangeDownStation}
          value={downStation}
        />
      </Wrapper>
      <Input
        type="number"
        onChange={onChangeDistance}
        value={distance}
        placeholder="거리"
        min={1}
        max={100}
      />
      <ColorSelector setColor={setColor} />
      <Button>확인</Button>
    </Container>
  );
};

export default LineAddForm;
