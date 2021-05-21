import { COLOR } from '../../../constants/styleConstant';
import * as S from './Input.styles';

export interface Props {
  type?: 'email' | 'number' | 'password' | 'submit' | 'text';
  emoji?: string;
  label?: string;
  placeholder?: string;
  borderColor?: COLOR;
}

const Input = ({ type = 'text', emoji, label, placeholder, borderColor }: Props) => {
  return (
    <S.InputContainer>
      {label && <S.Label>{label}</S.Label>}
      {emoji && <S.Emoji src={emoji} />}
      <S.Input type={type} placeholder={placeholder} borderColor={borderColor} emoji={emoji} />
    </S.InputContainer>
  );
};

export default Input;
