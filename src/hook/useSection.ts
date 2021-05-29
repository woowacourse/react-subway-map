import { useDispatch, useSelector } from 'react-redux';
import { AddSectionAction, DeleteSectionAction, SectionState } from '../interfaces/section';
import { RootState } from '../modules';
import {
  addSectionAsync,
  deleteSectionAsync,
  getSectionAsync,
  resetError as _resetError,
} from '../modules/section/sectionReducer';

const useSection = () => {
  const { lineSection, error } = useSelector((state: RootState) => state.section);
  const dispatch = useDispatch();

  const getSection = (id: SectionState['lineSection']['id']) => {
    dispatch(getSectionAsync({ id }));
  };

  const addSection = (payload: AddSectionAction['payload']) => {
    dispatch(addSectionAsync(payload));
  };

  const deleteSection = (payload: DeleteSectionAction['payload']) => {
    dispatch(deleteSectionAsync(payload));
  };

  const resetError = () => {
    dispatch(_resetError());
  };

  return { lineSection, getSection, addSection, deleteSection, error, resetError };
};

export default useSection;
