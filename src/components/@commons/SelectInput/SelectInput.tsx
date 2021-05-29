import { Color } from '../../../constants/styleType';
import * as S from './SelectInput.styles';

export interface Props {
  name?: string;
  value?: string | number;
  initialText?: string;
  borderColor?: Color;
  outLine?: Color;
  label?: string;
  children?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput = ({ name, value, borderColor, outLine, initialText, label, children, onChange }: Props) => {
  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}
      <S.SelectInput
        name={name}
        value={value ? value : ''}
        borderColor={borderColor}
        outLine={outLine}
        onChange={onChange}
      >
        <option value='' disabled>
          {initialText}
        </option>
        {children}
      </S.SelectInput>
    </S.Container>
  );
};

export default SelectInput;
