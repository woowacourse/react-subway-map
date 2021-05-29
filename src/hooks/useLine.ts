import { useAppDispatch, useAppSelector } from ".";
import { LineAddRequestItem, SectionAddRequestItem } from "../@types/types";
import { action } from "../modules/line";

const useLine = () => {
  const { items: lines, error } = useAppSelector(({ line: { items, error } }) => ({ items, error }));
  const dispatch = useAppDispatch();

  const getLines = async () => {
    await dispatch(action.getLines());
  };

  const addLine = async (lineRequestItem: LineAddRequestItem) => {
    await dispatch(action.addLine(lineRequestItem));
    await dispatch(action.getLines());
  };

  const deleteLine = async (id: number) => {
    await dispatch(action.deleteLine(id));
    await dispatch(action.getLines());
  };

  const addSection = async (sectionAddRequestItem: SectionAddRequestItem) => {
    await dispatch(action.addSection(sectionAddRequestItem));
    await dispatch(action.getLines());
  };

  const deleteSection = async ({ lineId, stationId }: { lineId: number; stationId: number }) => {
    await dispatch(action.deleteSection({ lineId, stationId }));
    await dispatch(action.getLines());
  };

  return {
    lines,
    getLines,
    addLine: addLine,
    deleteLine: deleteLine,
    addSection: addSection,
    deleteSection: deleteSection,
    error,
  };
};

export default useLine;
