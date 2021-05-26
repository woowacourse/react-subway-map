import { useEffect } from 'react';
import { ContentContainer } from '../../components/@commons/ContentContainer/ContentContainer.styles';
import AddSectionForm from '../../components/SectionPage/AddSectionForm';
import SectionListItem from '../../components/SectionPage/SectionListItem';
import useLine from '../../hook/useLine';
import useSection from '../../hook/useSection';
import useStation from '../../hook/useStation';
import { LineSection } from '../../interfaces';
import * as S from './Section.styles';

const getSectionStations = (lineSection: LineSection) => {
  if (!lineSection?.sections) return [];

  const { downStation: lastStation } = lineSection.sections[lineSection.sections.length - 1];

  const sectionStations = lineSection.sections.map(({ upStation, distance }) => ({
    id: upStation.id,
    name: upStation.name,
    distance,
  }));
  sectionStations.push({ id: lastStation.id, name: lastStation.name, distance: -1 });

  return sectionStations;
};

const Section = () => {
  const { lineSection, getSection, error } = useSection();
  const { lines } = useLine();
  const { stations } = useStation();

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
        <AddSectionForm onChange={handleSelectLine} lineSection={lineSection} lines={lines} stations={stations} />
      </ContentContainer>
      <ContentContainer>
        <S.SectionStationList>
          {getSectionStations(lineSection).map(station => (
            <SectionListItem
              key={station.id}
              name={station.name}
              distance={station.distance}
              lineColor={lineSection.color}
            />
          ))}
        </S.SectionStationList>
      </ContentContainer>
    </S.Container>
  );
};

export default Section;
