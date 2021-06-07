import { action } from "../modules/line";

import { useAppDispatch, useAppSelector } from "./useRedux";

import { LineAddRequestItem, SectionAddRequestItem } from "../@types";

const useLine = () => {
  const { items: lines, loading, error } = useAppSelector(
    ({ line: { items, loading, error } }) => ({
      items,
      loading,
      error,
    })
  );
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

  const deleteSection = async ({
    lineId,
    stationId,
  }: {
    lineId: number;
    stationId: number;
  }) => {
    await dispatch(action.deleteSection({ lineId, stationId }));
    await dispatch(action.getLines());
  };

  return {
    lines,
    loading,
    error,
    getLines,
    addLine,
    deleteLine,
    addSection,
    deleteSection,
  };
};

export default useLine;
