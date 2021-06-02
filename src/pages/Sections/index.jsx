import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import cx from "classnames";
import STATUS from "../../constants/status";
import { useToggle } from "../../components/@shared/hooks";

import { useInput } from "../../components/@shared/Input/hooks";
import Main from "../../components/@shared/Main";
import Modal from "../../components/@shared/Modal";

import Loading from "../../components/@shared/Loading";
import SectionsStationList from "../../components/SectionsStationList";
import SectionsModalInner from "../../components/SectionsModalInner";
import SectionsLineSelect from "../../components/SectionsLineSelect";
import {
  fetchLines,
  fetchLinesDetail,
  reset,
  selectLinesStatus,
  selectLinesMessage,
} from "../Lines/slice";

const Sections = () => {
  const dispatch = useDispatch();

  const [isModalOpen, handleModalOpen, handleModalClose] = useToggle(false);
  const [lineId, handleLineIdChange] = useInput();

  const status = useSelector(selectLinesStatus);
  const message = useSelector(selectLinesMessage);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchLines())
        .then(unwrapResult)
        .then((list) => {
          if (!list || list.length === 0) return;

          handleLineIdChange({
            target: { value: list[list.length - 1].id.toString() },
          });
        });

      dispatch(fetchLinesDetail());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === STATUS.SUCCEED) {
      if (message) {
        alert(message);
      }

      handleModalClose();
      dispatch(reset());
    }

    if (status === STATUS.FAILED) {
      alert(message);
      dispatch(reset());
    }
  }, [dispatch, handleModalClose, message, status]);

  return (
    <>
      <Loading isLoading={status === STATUS.LOADING} bgOpacity="10" />
      <Main>
        <section className="pb-8 px-4 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
            구간 관리
          </h2>
          <SectionsLineSelect onChange={handleLineIdChange} lineId={lineId} />
          <div className="relative">
            <hr className="-mx-4 my-12" />
            <button
              type="button"
              className={cx(
                "absolute -top-7 right-0 w-14 h-14 text-3xl rounded-full focus:outline-none shadow-md",
                lineId ? "bg-yellow-300 hover:bg-yellow-400 " : "bg-gray-300"
              )}
              onClick={handleModalOpen}
              aria-label="add-button"
              disabled={!lineId}
            >
              +
            </button>
          </div>
          <SectionsStationList lineId={lineId} />
        </section>
      </Main>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <SectionsModalInner lineId={lineId} onClose={handleModalClose} />
      </Modal>
    </>
  );
};

export default Sections;
