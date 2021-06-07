import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import STATUS from "../../constants/status";
import {
  fetchLines,
  reset,
  selectLinesMessage,
  selectLinesStatus,
} from "../../pages/Lines/slice";
import Loading from "../@shared/Loading";
import Main from "../@shared/Main";
import Button from "../@shared/Button";
import LinesList from "../LinesList";

const LinesMain = ({ openModal }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectLinesStatus);
  const message = useSelector(selectLinesMessage);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchLines());
    }

    return () => dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === STATUS.SUCCEED) {
      dispatch(reset());
    }

    if (status === STATUS.FAILED) {
      alert(message);
      dispatch(reset());
    }
  }, [status, message, dispatch]);

  return (
    <>
      <Loading isLoading={status === STATUS.LOADING} bgOpacity="10" />
      <Main>
        <section className="pb-8 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <div className="flex items-center justify-between px-4">
            <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
              노선 관리
            </h2>
            <Button onClick={openModal} type="button" size="medium">
              등록
            </Button>
          </div>
          <LinesList />
        </section>
      </Main>
    </>
  );
};

LinesMain.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default LinesMain;
