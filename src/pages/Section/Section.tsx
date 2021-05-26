import { useEffect } from 'react';
import { ContentContainer } from '../../components/@commons/ContentContainer/ContentContainer.styles';
import AddSectionForm from '../../components/SectionPage/AddSectionForm';
import SectionListItem from '../../components/SectionPage/SectionListItem';
import useLine from '../../hook/useLine';
import useSection from '../../hook/useSection';
import { LineSection } from '../../interfaces';
import * as S from './Section.styles';

const getSectionStations = (lineSection: LineSection) => {
  if (!lineSection?.sections) return;

  const sectionStations = lineSection.sections.map(({ upStation, downStation, distance }, index) => {
    return index === lineSection.sections.length - 1 ? (
      <>
        <SectionListItem key={upStation.id} name={upStation.name} distance={distance} lineColor={lineSection.color} />
        <SectionListItem key={downStation.id} name={downStation.name} lineColor={lineSection.color} />
      </>
    ) : (
      <SectionListItem key={upStation.id} name={upStation.name} distance={distance} lineColor={lineSection.color} />
    );
  });

  return sectionStations;
};

const Section = () => {
  const { lineSection, getSection, error } = useSection();
  const { lines } = useLine();

  useEffect(() => {
    if (error) {
      window.alert(error);
    }
  }, [error]);

  const handleSelectLine = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getSection(Number(e.target.value));
  };

  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <AddSectionForm onChange={handleSelectLine} lines={lines} />
      </ContentContainer>
      <ContentContainer>
        <S.SectionStationList>{getSectionStations(lineSection)}</S.SectionStationList>
      </ContentContainer>
    </S.Container>
  );
};

export default Section;
