import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from ".";
import { LineAddRequestItem, SectionAddRequestItem } from "../@types/types";
import { action } from "../modules/line";

const useLine = () => {
  const { items: lines, error } = useAppSelector(({ line: { items, error } }) => ({ items, error }));
  const dispatch = useAppDispatch();

  const getLines = async () => {
    const getLineResult = await dispatch(action.getLines());
    await unwrapResult(getLineResult);
  };

  const addLine = async (lineRequestItem: LineAddRequestItem) => {
    const addLineResult = await dispatch(action.addLine(lineRequestItem));
    await unwrapResult(addLineResult);
    getLines();
  };

  const deleteLine = async (id: number) => {
    const deleteLineResult = await dispatch(action.deleteLine(id));
    await unwrapResult(deleteLineResult);

    getLines();
  };

  const addSection = async (sectionAddRequestItem: SectionAddRequestItem) => {
    const addSectionResult = await dispatch(action.addSection(sectionAddRequestItem));
    await unwrapResult(addSectionResult);

    getLines();
  };

  const deleteSection = async ({ lineId, stationId }: { lineId: number; stationId: number }) => {
    const deleteSectionResult = await dispatch(action.deleteSection({ lineId, stationId }));
    await unwrapResult(deleteSectionResult);

    getLines();
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
