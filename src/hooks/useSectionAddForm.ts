import { useState } from 'react';
import { Section, SectionForm, StationId } from '../types';
import useStation from './useStation';
import useSection from './useSection';
import { INVALID_VALUE } from '../constants/validate';
import { SERVICE } from '../constants/service';

const useSectionForm = () => {
  const [form, setForm] = useState<SectionForm>({
    distance: SERVICE.MIN_DISTANCE,
    downStationId: INVALID_VALUE,
    upStationId: INVALID_VALUE,
  });
  const { distance, downStationId, upStationId } = form;

  const { stations } = useStation();
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

  const availableDownStations = stations.isSuccess
    ? stations.data.filter(
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
        (section) => section.upStation.id === upStationId
      ) as Section
    )?.distance ?? 0;

  const isValidDistance = distance < selectedSectionDistance;

  const isSelectedUpStation = upStationId !== INVALID_VALUE;

  const isSelectedDownStation = downStationId !== INVALID_VALUE;

  const isValidForm =
    isSelectedLine &&
    isValidDistance &&
    isSelectedUpStation &&
    isSelectedDownStation;

  return {
    form,

    distance,
    upStationId,
    downStationId,
    availableUpStations,
    availableDownStations,
    selectedSectionDistance,

    setDistance,
    setUpStationId,
    setDownStationId,

    isValidForm,
    isSelectedLine,
    isSelectedUpStation,
    isValidDistance,
  };
};

export default useSectionForm;
