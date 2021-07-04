import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadStations } from '../redux/stationSlice';
import { RootState, useAppDispatch } from '../redux/store';
import { Station } from '../types';

interface StationState {
  stations: Station[];
  isLoading: boolean;
  errorMessage: string;
}

const useStations = (): StationState => {
  const { stations, isLoading, errorMessage } = useSelector((state: RootState) => state.station);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (stations.length === 0) {
      dispatch(loadStations());
    }
  }, []);

  return { stations, isLoading, errorMessage };
};

export default useStations;
