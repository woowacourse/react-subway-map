import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToggle } from "../../components/@shared/hooks";

import Main from "../../components/@shared/Main";

import Modal from "../../components/@shared/Modal";
import Button from "../../components/@shared/Button";
import LineList from "../../components/LineList";
import LinesModalInner from "../../components/LinesModalInner";
import Loading from "../../components/@shared/Loading";
import STATUS from "../../constants/status";
import {
  fetchLines,
  selectLinesMessage,
  selectLinesStatus,
  reset,
} from "./slice";

const Lines = () => {
  const dispatch = useDispatch();
  const [isModalOpen, handleModalOpen, handleModalClose] = useToggle(false);

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
            <Button
              type="button"
              disabled={false}
              size="medium"
              theme="primary"
              onClick={handleModalOpen}
              name={null}
              value={null}
            >
              등록
            </Button>
          </div>
          <LineList />
        </section>
      </Main>
      <Modal onClose={handleModalClose} isOpen={isModalOpen}>
        <LinesModalInner onClose={handleModalClose} />
      </Modal>
    </>
  );
};

export default Lines;
