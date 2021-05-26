import { useDispatch, useSelector } from 'react-redux';
import { LineSection } from '../interfaces';
import { RootState } from '../modules';
import { getSectionAsync } from '../modules/section/sectionReducer';

const useSection = () => {
  const { lineSection, error } = useSelector((state: RootState) => state.section);
  const dispatch = useDispatch();

  const getSection = (id: LineSection['id']) => {
    dispatch(getSectionAsync({ id }));
  };

  return { lineSection, getSection, error };
};

export default useSection;
