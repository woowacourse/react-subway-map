import { useAppDispatch, useAppSelector } from ".";
import { LineRequestItem } from "../@types/types";
import { action } from "../modules/line";

const useLine = () => {
  const lines = useAppSelector(({ line: { items } }) => items);
  const dispatch = useAppDispatch();

  const getLines = async () => {
    await dispatch(action.getLines());
  };

  const addLine = async (lineRequestItem: LineRequestItem) => {
    await dispatch(action.addLine(lineRequestItem));
  };

  const deleteLine = async (id: number) => {
    await dispatch(action.deleteLine(id));
  };

  return { lines, getLines, addLine, deleteLine };
};

export default useLine;
