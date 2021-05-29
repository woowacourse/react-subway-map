import { Container } from './StationAddForm.styles';
import { Input, Button } from '../../atoms';

export interface StationAddFormProps {
  stationName: string;
  onChangeStationName: React.ChangeEventHandler<HTMLInputElement>;
  onSubmitStationInfo: React.FormEventHandler<HTMLFormElement>;
}

const StationAddForm = ({
  stationName,
  onChangeStationName,
  onSubmitStationInfo,
}: StationAddFormProps) => {
  return (
    <Container onSubmit={onSubmitStationInfo}>
      <Input
        placeholder="역 이름"
        onChange={onChangeStationName}
        value={stationName}
        minLength={2}
        maxLength={20}
      />
      <Button>추가</Button>
    </Container>
  );
};

export default StationAddForm;
