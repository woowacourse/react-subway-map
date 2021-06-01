import {
  requestDeleteSection,
  requestAddSection,
  requestSection,
} from './../service/section';
import { useEffect, useState } from 'react';
import { LineDetail, LineId, Section, SectionForm, StationId } from '../types';
import useLogin from './useLogin';
import { useMutation } from 'react-query';
import { useAppDispatch, useAppSelector } from '../state/store';
import { lineAction } from '../state/slices/line';
import useStation from './useStation';
import { INVALID_VALUE } from '../constants/validate';
import { SERVICE } from '../constants/service';

const useSection = () => {
  const { currentLineId, shouldUpdate } = useAppSelector(
    ({ line: { currentLineId, shouldUpdate } }) => ({
      currentLineId,
      shouldUpdate,
    })
  );

  const dispatch = useAppDispatch();

  const [currentLineDetail, setCurrentLineDetail] = useState<LineDetail>({
    id: INVALID_VALUE,
    name: '',
    color: 'red',
    stations: [],
    sections: [],
  });

  const [form, setForm] = useState<SectionForm>({
    distance: SERVICE.MIN_DISTANCE,
    downStationId: INVALID_VALUE,
    upStationId: INVALID_VALUE,
  });

  const { distance, downStationId, upStationId } = form;

  const { stations } = useStation();
  const { accessToken } = useLogin();
  const addSectionMutation = useMutation(
    () => requestAddSection(currentLineId, form, accessToken),
    {
      onSuccess: () => {
        dispatch(lineAction.setShouldUpdate());
      },
      onError: () => {
        alert('구간을 추가하지 못했습니다!');
      },
    }
  );

  const setCurrentLineId = (currentLineId: LineId) => {
    dispatch(lineAction.setLineId(currentLineId));
  };

  const deleteSectionMutation = useMutation(
    (stationId: StationId) =>
      requestDeleteSection(currentLineId, stationId, accessToken),
    {
      onSuccess: () => updateCurrentSection(),
      onError: () => {
        alert('구간을 삭제하지 못했습니다!');
      },
    }
  );

  useEffect(() => {
    if (currentLineId === INVALID_VALUE) return;

    updateCurrentSection();
  }, [currentLineId, shouldUpdate]);

  const updateCurrentSection = async () => {
    // TODO: magic number!
    if (currentLineId === INVALID_VALUE) return;

    const data = await requestSection(currentLineId, accessToken);

    setCurrentLineDetail(data);
  };

  const deleteSection = (stationId: StationId) => {
    deleteSectionMutation.mutate(stationId);
  };

  const addSection = () => {
    return addSectionMutation.mutate();
  };

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
    distance,
    upStationId,
    downStationId,
    currentLineId,
    setCurrentLineId,
    currentLineDetail,
    addSection,
    deleteSection,
    setDistance,
    setUpStationId,
    setDownStationId,
    updateCurrentSection,
    isValidForm,
    isSelectedLine,
    isSelectedUpStation,
    availableUpStations,
    availableDownStations,
    selectedSectionDistance,
    isValidDistance,
  };
};

export default useSection;
