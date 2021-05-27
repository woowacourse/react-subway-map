import { useAppDispatch } from ".";
import { SectionAddRequestItem } from "../@types/types";
import { action } from "../modules/line";

const useSection = () => {
  const dispatch = useAppDispatch();

  const addSection = async (sectionAddRequestItem: SectionAddRequestItem) => {
    await dispatch(action.addSection(sectionAddRequestItem));
  };

  const deleteSection = async ({ lineId, stationId }: { lineId: number; stationId: number }) => {
    await dispatch(action.deleteSection({ lineId, stationId }));
  };

  return { addSection, deleteSection };
};

export default useSection;
