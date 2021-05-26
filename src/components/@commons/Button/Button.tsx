import { Color } from '../../../constants/styleType';
import * as S from './Button.styles';

export interface Props {
  type?: 'button' | 'submit' | 'reset';
  children?: string;
  bgColor?: Color;
  fontColor?: Color;
  isDisabled?: boolean;
  shape?: 'CIRCLE' | 'SQUARE';
  onClick?: (event: React.MouseEvent) => void;
}

const Button = ({ type, children, bgColor, fontColor, isDisabled, shape, onClick }: Props) => {
  return (
    <S.Button
      type={type}
      bgColor={bgColor}
      fontColor={fontColor}
      isDisabled={isDisabled}
      shape={shape}
      onClick={onClick}
    >
      {children}
    </S.Button>
  );
};

export default Button;
