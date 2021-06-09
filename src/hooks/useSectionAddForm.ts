import { Section, StationId } from './../types';
import { INVALID_VALUE } from './../constants/validate';
import { useState } from 'react';
import { SectionForm } from '../types';
import { SERVICE } from './../constants/service';
import useStation from './useStation';
import useSection from './useSection';

const useSectionAddForm = () => {
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
        (section: Section) => section.upStation.id === upStationId
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
    isValidForm,
    isSelectedLine,
    isSelectedUpStation,
    isValidDistance,
    setDistance,
    setUpStationId,
    setDownStationId,
  };
};

export default useSectionAddForm;
