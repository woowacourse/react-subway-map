import { Container } from './StationAddForm.styles';
import { Input, Button } from '../../atoms';

export interface StationAddFormProps {
  stationName: string;
  onChangeStationName: React.ChangeEventHandler<HTMLInputElement>;
  onSubmitStationName: React.FormEventHandler<HTMLFormElement>;
}

const StationAddForm = ({
  stationName,
  onChangeStationName,
  onSubmitStationName,
}: StationAddFormProps) => {
  return (
    <Container onSubmit={onSubmitStationName}>
      <Input placeholder="역 이름" onChange={onChangeStationName} value={stationName} />
      <Button>추가</Button>
    </Container>
  );
};

export default StationAddForm;
