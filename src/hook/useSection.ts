import { useDispatch, useSelector } from 'react-redux';
import { AddSectionPayload, LineSection } from '../interfaces';
import { RootState } from '../modules';
import { addSectionAsync, getSectionAsync } from '../modules/section/sectionReducer';

const useSection = () => {
  const { lineSection, error } = useSelector((state: RootState) => state.section);
  const dispatch = useDispatch();

  const getSection = (id: LineSection['id']) => {
    dispatch(getSectionAsync({ id }));
  };

  const addSection = (payload: AddSectionPayload) => {
    dispatch(addSectionAsync(payload));
  };

  return { lineSection, getSection, addSection, error };
};

export default useSection;
