import * as S from './ContentContainer.styles';

export interface Props {
  children: React.ReactNode;
  hasHat?: boolean;
}

const ContentContainer = ({ hasHat, children }: Props) => {
  return <S.ContentContainer hasHat={hasHat}>{children}</S.ContentContainer>;
};

export default ContentContainer;
