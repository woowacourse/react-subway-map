import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  fetchLines,
  selectLinesList,
  selectLinesMessage,
  selectLinesStatus,
  reset,
} from "../../pages/Lines/slice";
import Loading from "../@shared/Loading";
import Main from "../@shared/Main";
import ListSelect from "../ListSelect";
import SectionsAddButton from "../SectionsAddButton";
import SectionsDetail from "../SectionsDetail";
import STATUS from "../../constants/status";

const SectionsMain = ({ lineId, openModal, onLineChange }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectLinesStatus);
  const message = useSelector(selectLinesMessage);
  const linesList = useSelector(selectLinesList) ?? [];

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchLines())
        .then(unwrapResult)
        .then((list) => {
          if (!list || list.length === 0) return;

          onLineChange({
            target: { value: list[list.length - 1].id.toString() },
          });
        });
    }

    return () => dispatch(reset());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (message) {
      alert(message);
    }

    if (status === STATUS.SUCCEED || status === STATUS.FAILED) {
      dispatch(reset());
    }
  }, [message, status, dispatch]);

  return (
    <>
      <Loading isLoading={status === STATUS.LOADING} bgOpacity="10" />
      <Main>
        <section className="pb-8 px-4 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
            구간 관리
          </h2>
          <ListSelect
            onChange={onLineChange}
            value={lineId}
            list={[...linesList].reverse()}
            placeholder="노선 선택"
          />
          <div className="relative">
            <hr className="-mx-4 my-12" />
            <SectionsAddButton onClick={openModal} disabled={!lineId} />
          </div>
          <SectionsDetail lineId={lineId} />
        </section>
      </Main>
    </>
  );
};

SectionsMain.propTypes = {
  lineId: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  onLineChange: PropTypes.func.isRequired,
};

export default SectionsMain;
