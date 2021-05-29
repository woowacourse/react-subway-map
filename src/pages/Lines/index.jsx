import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import STATUS from "../../constants/status";
import { useModal } from "../../components/@shared/Modal/hooks";
import Main from "../../components/@shared/Main";
import Button from "../../components/@shared/Button";
import Loading from "../../components/@shared/Loading";
import LinesList from "../../components/LinesList";
import LinesModal from "../../components/LinesModal";
import {
  fetchLines,
  reset,
  selectLinesStatus,
  selectLinesMessage,
  selectLinesList,
} from "./slice";

const Lines = () => {
  const dispatch = useDispatch();
  const [isModalOpen, handleModalOpen, handleModalClose] = useModal(false);
  const status = useSelector(selectLinesStatus);
  const message = useSelector(selectLinesMessage);
  const list = useSelector(selectLinesList);

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
            <Button onClick={handleModalOpen} type="button" size="medium">
              등록
            </Button>
          </div>
          <LinesList list={list} />
        </section>
      </Main>
      <LinesModal close={handleModalClose} isOpen={isModalOpen} />
    </>
  );
};

export default Lines;
