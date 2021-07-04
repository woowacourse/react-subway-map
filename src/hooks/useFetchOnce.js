import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const useFetchOnce = ({ fetch, reset, callback }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const resetStatus = () => dispatch(reset());

    dispatch(fetch())
      .then(unwrapResult)
      .then((...args) => {
        if (callback && typeof callback === "function") {
          callback(...args);
        }
      })
      .then(resetStatus);

    return resetStatus;
  }, [callback, dispatch, fetch, reset]);
};

export default useFetchOnce;
