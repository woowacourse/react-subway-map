import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { LineInterface, SelectedLineInterface, StationInterface } from 'types';

const useData = () => {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const accessToken: string | null = useAppSelector((state) => state.auth.accessToken);
  const stations: StationInterface[] | null = useAppSelector((state) => state.station.stations);
  const lines: LineInterface[] | null = useAppSelector((state) => state.line.lines);
  const selectedLine: SelectedLineInterface | null = useAppSelector((state) => state.line.selectedLine);

  return { accessToken, stations, lines, selectedLine };
};

export default useData;
