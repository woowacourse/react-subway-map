import { Station } from '../../interfaces';
import trashCanSVG from '../../assets/svg/trash-can.svg';
import editSVG from '../../assets/svg/edit.svg';
import * as S from './StationListItem.styles';

export interface Props {
  name: String;
  id: number;
  deleteStation: (id: Station['id']) => void;
}

const StationListItem = ({ name, id, deleteStation }: Props) => {
  const handleDeleteStation = () => {
    if (!window.confirm(`${name}을 삭제하시겠습니까?`)) return;

    deleteStation(id);
  };

  return (
    <S.StationListItem>
      <S.Name>{name}</S.Name>

      <S.ButtonContainer>
        <S.ButtonWrapper>
          <S.Button src={editSVG} />
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <S.Button src={trashCanSVG} onClick={handleDeleteStation} />
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.StationListItem>
  );
};

export default StationListItem;
