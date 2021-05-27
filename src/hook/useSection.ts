import { useDispatch, useSelector } from 'react-redux';
import { AddSectionPayload, DeleteSectionPayload, LineSection } from '../interfaces';
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

  const getSection = (id: LineSection['id']) => {
    dispatch(getSectionAsync({ id }));
  };

  const addSection = (payload: AddSectionPayload) => {
    dispatch(addSectionAsync(payload));
  };

  const deleteSection = (payload: DeleteSectionPayload) => {
    dispatch(deleteSectionAsync(payload));
  };

  const resetError = () => {
    dispatch(_resetError());
  };

  return { lineSection, getSection, addSection, deleteSection, error, resetError };
};

export default useSection;
