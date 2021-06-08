import { useEffect } from 'react';
import { Redirect } from 'react-router';
import * as S from './Section.styles';

import { ContentContainer } from '../../components/@commons/ContentContainer/ContentContainer.styles';
import AddSectionForm from '../../components/SectionPage/AddSectionForm/AddSectionForm';
import SectionListItem from '../../components/SectionPage/SectionListItem/SectionListItem';

import useLine from '../../hook/useLine';
import useSection from '../../hook/useSection';
import useStation from '../../hook/useStation';
import useUser from '../../hook/useUser';

import { SectionState } from '../../interfaces/section';
import { LINE, MESSAGE } from '../../constants/constant';
import { ROUTE } from '../../constants/api';

const getSectionStations = (lineSection: SectionState['lineSection']) => {
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
  const { lineSection, getSection, addSection, deleteSection, error, resetError } = useSection();
  const { lines } = useLine();
  const { stations } = useStation();
  const { accessToken } = useUser();

  useEffect(() => {
    if (error) {
      window.alert(error);
      resetError();
    }
  }, [error, resetError]);

  // if (!accessToken) {
  //   return <Redirect to={ROUTE.SIGN_IN} />;
  // }

  const handleSelectLine = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getSection(Number(e.target.value));
  };

  const handleDeleteSection = (stationId: string, name: string) => {
    if (lineSection.stations.length <= LINE.MIN_STATIONS) {
      window.alert(MESSAGE.ERROR.LINE.ESSENTIAL_STATIONS);
      return;
    }

    if (!window.confirm(`정말로 ${name} 역을 구간에서 삭제하시겠습니까?`)) return;

    deleteSection({ lineId: String(lineSection.id), stationId });
  };

  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <AddSectionForm
          onChange={handleSelectLine}
          lineSection={lineSection}
          lines={lines}
          stations={stations}
          addSection={addSection}
        />
      </ContentContainer>

      <ContentContainer>
        <S.SectionStationList>
          {getSectionStations(lineSection).map(station => (
            <SectionListItem
              key={station.id}
              name={station.name}
              distance={station.distance}
              lineColor={lineSection.color}
              handleDeleteSection={() => {
                handleDeleteSection(String(station.id), station.name);
              }}
            />
          ))}
        </S.SectionStationList>
      </ContentContainer>
    </S.Container>
  );
};

export default Section;
