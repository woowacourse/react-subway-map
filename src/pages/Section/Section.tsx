import { useEffect } from 'react';
import { Redirect } from 'react-router';
import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import AddSectionForm from '../../components/SectionPage/AddSectionForm';
import SectionListItem from '../../components/SectionPage/SectionListItem';
import { ROUTE } from '../../constants/route';
import useLine from '../../hook/useLine';
import useSection from '../../hook/useSection';
import useStation from '../../hook/useStation';
import useUser from '../../hook/useUser';
import { LineSection } from '../../interfaces/section';
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
  const { lineSection, getLineSection, addSection, deleteSection, error, resetError } = useSection();
  const { lines } = useLine();
  const { stations } = useStation();
  const { accessToken } = useUser();

  useEffect(() => {
    if (error) {
      window.alert(error);
      resetError();
    }
  }, [error, resetError]);

  if (!accessToken) {
    return <Redirect to={ROUTE.SIGN_IN} />;
  }

  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <AddSectionForm
          lineSection={lineSection}
          lines={lines}
          stations={stations}
          getLineSection={getLineSection}
          addSection={addSection}
        />
      </ContentContainer>

      <ContentContainer>
        <S.SectionStationList>
          {getSectionStations(lineSection).map(station => (
            <SectionListItem
              key={station.id}
              id={station.id}
              name={station.name}
              distance={station.distance}
              lineColor={lineSection.color}
              lineSection={lineSection}
              deleteSection={deleteSection}
            />
          ))}
        </S.SectionStationList>
      </ContentContainer>
    </S.Container>
  );
};

export default Section;
