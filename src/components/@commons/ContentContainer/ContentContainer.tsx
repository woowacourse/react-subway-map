import { Color } from '../../../constants/styleType';
import * as S from './ContentContainer.styles';

export interface Props {
  children: React.ReactNode;
  hatColor?: Color;
}

const ContentContainer = ({ hatColor, children }: Props) => {
  return <S.ContentContainer hatColor={hatColor}>{children}</S.ContentContainer>;
};

export default ContentContainer;
