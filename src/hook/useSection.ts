import { useDispatch, useSelector } from 'react-redux';
import { AddSectionRequest, DeleteSectionRequest, LineSection } from '../interfaces/section';
import { RootState } from '../modules';
import {
  addSectionAsync,
  deleteSectionAsync,
  getLineSectionAsync,
  resetError as _resetError,
} from '../modules/section/sectionReducer';

const useSection = () => {
  const { lineSection, error } = useSelector((state: RootState) => state.section);
  const dispatch = useDispatch();

  const getLineSection = (id: LineSection['id']) => {
    dispatch(getLineSectionAsync({ id }));
  };

  const addSection = (section: AddSectionRequest) => {
    dispatch(addSectionAsync({ section }));
  };

  const deleteSection = (section: DeleteSectionRequest) => {
    dispatch(deleteSectionAsync({ section }));
  };

  const resetError = () => {
    dispatch(_resetError());
  };

  return { lineSection, getLineSection, addSection, deleteSection, error, resetError };
};

export default useSection;
