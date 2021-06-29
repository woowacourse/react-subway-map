import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from ".";
import { action } from "../modules/subwayMap";

const useSubwayMap = () => {
  const { items: subwayMapItems, error, loading } = useAppSelector(({ subwayMap: { items, error, loading } }) => ({
    items,
    error,
    loading,
  }));

  const dispatch = useAppDispatch();

  const getSubwayMap = async () => {
    const getSubwayMapResult = await dispatch(action.getSubwayMap());
    await unwrapResult(getSubwayMapResult);
  };

  return {
    subwayMapItems,
    loading,
    error,
    getSubwayMap,
  };
};

export default useSubwayMap;
