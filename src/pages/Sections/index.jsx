import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import { useModal } from "../../components/@shared/Modal/hooks";
import { useInput } from "../../components/@shared/Input/hooks";
import {
  fetchLines,
  fetchLinesDetail,
  reset,
  selectLinesDetailByLineId,
  selectLinesList,
  selectLinesStatus,
  selectLinesMessage,
} from "../Lines/slice";
import Main from "../../components/@shared/Main";
import Loading from "../../components/@shared/Loading";
import ListSelect from "../../components/ListSelect";
import SectionsDetail from "../../components/SectionsDetail";
import SectionsAddButton from "../../components/SectionsAddButton";
import SectionsModal from "../../components/SectionsModal";

const Sections = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLinesStatus);
  const message = useSelector(selectLinesMessage);
  const linesList = useSelector(selectLinesList);
  const [isModalOpen, handleModalOpen, handleModalClose] = useModal(false);
  const [lineId, handleLineIdChange] = useInput();
  const lineDetail = useSelector((state) =>
    selectLinesDetailByLineId(state, lineId)
  );

  useEffect(() => {
    console.log("[Sections] useEffect []", status);
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

    return () => dispatch(reset());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(
      "[Sections] useEffect [message, status, dispatch, handleModalClose]",
      status
    );
    (async () => {
      if (status === STATUS.SUCCEED) {
        if (message) {
          alert(message);
        }

        dispatch(reset());
      }

      if (status === STATUS.FAILED) {
        alert(message);
        dispatch(reset());
      }
    })();
  }, [message, status, dispatch, handleModalClose]);

  return (
    <>
      <Loading isLoading={status === STATUS.LOADING} bgOpacity="10" />
      <Main>
        <section className="pb-8 px-4 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
            구간 관리
          </h2>
          <ListSelect
            onChange={handleLineIdChange}
            value={lineId}
            list={linesList}
            placeholder="노선 선택"
          />
          <div className="relative">
            <hr className="-mx-4 my-12" />
            <SectionsAddButton onClick={handleModalOpen} disabled={!lineId} />
          </div>
          <SectionsDetail detail={lineDetail} />
        </section>
      </Main>

      <SectionsModal
        isOpen={isModalOpen}
        close={handleModalClose}
        lineDetail={lineDetail}
      />
    </>
  );
};

export default Sections;
