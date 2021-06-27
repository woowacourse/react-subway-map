import { Container } from './StationAddForm.styles';
import { Input, Button } from '../../atoms';
import { useFormContext } from '../../contexts/FormContext/FormContext';

const StationAddForm = () => {
  const { onSubmit } = useFormContext();

  return (
    <Container onSubmit={onSubmit}>
      <Input name="stationName" placeholder="역 이름" minLength={2} maxLength={20} required />
      <Button>추가</Button>
    </Container>
  );
};

export default StationAddForm;
