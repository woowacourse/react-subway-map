import { useAppDispatch } from './useStore';
import { Line, SectionAttribute, Station } from '../types';
import { addSection, deleteSection } from '../slices/lineSlice';

const useSection = () => {
  const dispatch = useAppDispatch();

  const add = ({ lineId, data }: SectionAttribute) => dispatch(addSection({ lineId, data }));

  const remove = ({ lineId, stationId }: { lineId: Line['id']; stationId: Station['id'] }) =>
    dispatch(deleteSection({ lineId, stationId }));

  return {
    add,
    remove,
  };
};

export default useSection;
