import { Color } from '../../../constants/styleType';
import * as S from './Button.styles';

export interface Props {
  text?: string;
  bgColor?: Color;
  isDisabled?: boolean;
  shape?: 'CIRCLE' | 'SQUARE';
  onClick?: (event: React.MouseEvent) => void;
}

const Button = ({ text, bgColor, isDisabled, shape, onClick }: Props) => {
  return (
    <S.Button bgColor={bgColor} isDisabled={isDisabled} shape={shape} onClick={onClick}>
      {text}
    </S.Button>
  );
};

export default Button;
