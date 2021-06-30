import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const useData = () => {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const stations = useAppSelector((state) => state.station.stations);
  const lines = useAppSelector((state) => state.line.lines);
  const selectedLine = useAppSelector((state) => state.line.selectedLine);

  return { stations, lines, selectedLine };
};

export default useData;
