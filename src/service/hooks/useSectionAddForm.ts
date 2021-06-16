import { useState } from 'react';
import { Section, SectionForm, StationId } from '../../types';
import useStation from './useStation';
import useSection from './useSection';
import { INVALID_VALUE } from '../../constants/validate';
import { SERVICE } from '../../constants/service';

const useSectionForm = () => {
  const [form, setForm] = useState<SectionForm>({
    distance: SERVICE.MIN_DISTANCE,
    downStationId: INVALID_VALUE,
    upStationId: INVALID_VALUE,
  });

  const { stationsQuery } = useStation();
  const { currentLineDetail } = useSection();

  const setDistance = (distance: number) => {
    if (distance === 0) return;

    setForm({ ...form, distance });
  };

  const setUpStationId = (upStationId: StationId) => {
    setForm({ ...form, upStationId });
  };

  const setDownStationId = (downStationId: StationId) => {
    setForm({ ...form, downStationId });
  };

  const availableUpStations = currentLineDetail.stations;

  const availableDownStations = stationsQuery.isSuccess
    ? stationsQuery.data.filter(
        (station) =>
          !currentLineDetail.stations.some(
            (listedStation) => listedStation.id === station.id
          )
      )
    : [];

  const isSelectedLine = currentLineDetail.id !== INVALID_VALUE;

  const selectedSectionDistance =
    (
      currentLineDetail.sections.find(
        (section) => section.upStation.id === form.upStationId
      ) as Section
    )?.distance ?? 0;

  const isValidDistance = form.distance < selectedSectionDistance;

  const isSelectedUpStation = form.upStationId !== INVALID_VALUE;

  const isSelectedDownStation = form.downStationId !== INVALID_VALUE;

  const isValidForm =
    isSelectedLine &&
    isValidDistance &&
    isSelectedUpStation &&
    isSelectedDownStation;

  return {
    form,

    setDistance,
    setUpStationId,
    setDownStationId,

    availableUpStations,
    availableDownStations,
    selectedSectionDistance,

    isValidForm,
    isSelectedLine,
    isSelectedUpStation,
    isValidDistance,
  };
};

export default useSectionForm;
