import { Line } from '../../interfaces';
import Button from '../@commons/Button/Button';
import SelectInput from '../@commons/SelectInput/SelectInput';
import * as S from './AddSectionForm.styles';

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  lines: Line[];
}

const AddSectionForm = ({ onChange, lines }: Props) => {
  return (
    <S.AddSectionForm>
      <S.Title>지하철 구간 관리</S.Title>
      <S.InputWrapper>
        <SelectInput initialText='지하철 노선을 선택해주세요.' onChange={onChange}>
          {lines.map(line => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </SelectInput>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button shape='CIRCLE'>+</Button>
      </S.ButtonWrapper>
    </S.AddSectionForm>
  );
};

export default AddSectionForm;
