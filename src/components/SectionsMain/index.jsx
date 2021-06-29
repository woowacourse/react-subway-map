import React, { useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import STATUS from "../../constants/status";
import {
  fetchLines,
  selectLinesList,
  selectLinesMessage,
  selectLinesStatus,
  reset,
} from "../../pages/Lines/slice";
import Loading from "../@shared/Loading";
import Main from "../@shared/Main";
import Button from "../@shared/Button";
import ListSelect from "../ListSelect";
import SectionsDetail from "../SectionsDetail";

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
            target: { value: list[list.length - 1].id },
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
            <Button
              type="button"
              className={cx(
                "absolute -top-7 right-0 flex items-center justify-center w-12 h-12 text-3xl rounded-full focus:outline-none shadow-md",
                !lineId ? "bg-gray-300" : "bg-yellow-300 hover:bg-yellow-400 "
              )}
              onClick={openModal}
            >
              +
            </Button>
          </div>
          <SectionsDetail lineId={lineId} />
        </section>
      </Main>
    </>
  );
};

SectionsMain.propTypes = {
  lineId: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  onLineChange: PropTypes.func.isRequired,
};

export default SectionsMain;
