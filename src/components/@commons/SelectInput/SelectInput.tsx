import { Color } from '../../../constants/styleType';
import * as S from './SelectInput.styles';

export interface Props {
  initialText?: string;
  borderColor?: Color;
  children?: React.ReactNode;
}

const SelectInput = ({ borderColor, initialText, children }: Props) => {
  return (
    <S.SelectInput borderColor={borderColor}>
      <option value='' selected disabled>
        {initialText}
      </option>
      {children}
    </S.SelectInput>
  );
};

export default SelectInput;
