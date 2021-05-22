import { Color } from '../../../constants/styleType';
import * as S from './SelectInput.styles';

export interface Props {
  initialText?: string;
  borderColor?: Color;
  label?: string;
  children?: React.ReactNode;
}

const SelectInput = ({ borderColor, initialText, label, children }: Props) => {
  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}
      <S.SelectInput borderColor={borderColor}>
        <option value='' selected disabled>
          {initialText}
        </option>
        {children}
      </S.SelectInput>
    </S.Container>
  );
};

export default SelectInput;
