import * as S from './SectionListItem.styles';
import trashCanSVG from '../../assets/svg/trash-can.svg';
import editSVG from '../../assets/svg/edit.svg';
import { DeleteSectionRequest, LineSection } from '../../interfaces';

export interface Props {
  name: string;
  id: number;
  distance: number;
  lineColor?: string;
  lineSection: LineSection;
  deleteSection: ({ lineId, stationId }: DeleteSectionRequest) => void;
}

const SectionListItem = ({ id, name, distance, lineColor, lineSection, deleteSection }: Props) => {
  const handleDeleteSection = () => {
    if (lineSection.stations.length <= 2) {
      window.alert('노선에는 상행역과 하행역이 필수로 존재해야합니다...!');
      return;
    }

    if (!window.confirm(`정말로 ${name} 역을 구간에서 삭제하시겠습니까?`)) return;

    deleteSection({ lineId: String(lineSection.id), stationId: String(id) });
  };

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
          <S.Button src={trashCanSVG} onClick={handleDeleteSection} />
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.SectionListItem>
  );
};

export default SectionListItem;
