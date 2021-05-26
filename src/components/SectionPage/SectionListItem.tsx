import * as S from './SectionListItem.styles';
import trashCanSVG from '../../assets/svg/trash-can.svg';
import editSVG from '../../assets/svg/edit.svg';

export interface Props {
  name: string;
  distance: number;
  lineColor?: string;
}

const SectionListItem = ({ name, distance, lineColor }: Props) => {
  return (
    <S.SectionListItem>
      <S.NameWrapper>
        <S.Name lineColor={lineColor}>{name}</S.Name>
        {distance >= 0 && (
          <S.Distance>
            다음역까지
            <br /> {distance}KM
          </S.Distance>
        )}
      </S.NameWrapper>
      <S.ButtonContainer>
        <S.ButtonWrapper>
          <S.Button src={editSVG} />
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <S.Button src={trashCanSVG} />
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.SectionListItem>
  );
};

export default SectionListItem;
