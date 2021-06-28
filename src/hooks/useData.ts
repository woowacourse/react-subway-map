import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const useData = () => {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const stations = useAppSelector((state) => state.station.stations);
  const lines = useAppSelector((state) => state.line.lines);
  const selectedLine = useAppSelector((state) => state.line.selectedLine);

  return { accessToken, stations, lines, selectedLine };
};

export default useData;
