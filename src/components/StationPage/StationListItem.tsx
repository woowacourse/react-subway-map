import * as S from './StationListItem.styles';
import trashCanSVG from '../../assets/svg/trash-can.svg';
import editSVG from '../../assets/svg/edit.svg';
import { useDispatch } from 'react-redux';
import { deleteStationAsync } from '../../modules/station/stationReducer';

export interface Props {
  name: String;
  id: number;
}

const StationListItem = ({ name, id }: Props) => {
  const dispatch = useDispatch();

  const handleDeleteStation = () => {
    if (!window.confirm(`${name}을 삭제하시겠습니까?`)) return;

    dispatch(deleteStationAsync({ id }));
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
