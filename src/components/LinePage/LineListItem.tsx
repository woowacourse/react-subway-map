import * as S from './LineListItem.styles';
import trashCanSVG from '../../assets/svg/trash-can.svg';
import editSVG from '../../assets/svg/edit.svg';

export interface Props {
  name: string;
  id: number;
  color: string;
}

const LineListItem = ({ name, id, color }: Props) => {
  return (
    <S.LineListItem>
      <S.Name>{name}</S.Name>
      <S.ButtonContainer>
        <S.ButtonWrapper>
          <S.Button src={editSVG} />
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <S.Button src={trashCanSVG} />
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.LineListItem>
  );
};

export default LineListItem;
