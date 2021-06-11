import { useEffect } from "react";
import { useDispatch } from "react-redux";
import STATUS from "../constants/status";

const useStatus = ({ status, fetch, reset }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetch());
    }

    return () => dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === STATUS.SUCCEED || status === STATUS.FAILED) {
      dispatch(reset());
    }
  }, [status, reset, dispatch]);

  return status;
};

export default useStatus;
