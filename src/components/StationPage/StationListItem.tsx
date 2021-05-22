import * as S from './StationListItem.styles';
import trashCanSVG from '../../assets/svg/trash-can.svg';
import editSVG from '../../assets/svg/edit.svg';

export interface Props {
  name: String;
}

const StationListItem = ({ name }: Props) => {
  return (
    <S.StationListItem>
      <S.Name>{name}</S.Name>
      <S.ButtonContainer>
        <S.ButtonWrapper>
          <S.Button src={editSVG} />
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <S.Button src={trashCanSVG} />
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.StationListItem>
  );
};

export default StationListItem;
