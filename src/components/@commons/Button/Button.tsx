import { Color } from '../../../constants/styleType';
import * as S from './Button.styles';

export interface Props {
  children?: string;
  bgColor?: Color;
  isDisabled?: boolean;
  shape?: 'CIRCLE' | 'SQUARE';
  onClick?: (event: React.MouseEvent) => void;
}

const Button = ({ children, bgColor, isDisabled, shape, onClick }: Props) => {
  return (
    <S.Button bgColor={bgColor} isDisabled={isDisabled} shape={shape} onClick={onClick}>
      {children}
    </S.Button>
  );
};

export default Button;
