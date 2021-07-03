import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import useBoolean from "../../hooks/useBoolean";
import STATUS from "../../constants/status";
import {
  fetchLines,
  reset,
  selectLinesMessage,
  selectLinesStatus,
} from "./slice";
import Loading from "../../components/@shared/Loading";
import Alert from "../../components/@shared/Alert";
import Modal from "../../components/@shared/Modal";
import LinesMain from "../../components/LinesMain";
import LinesForm from "../../components/LinesForm";

const Lines = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLinesStatus);
  const message = useSelector(selectLinesMessage);

  const [isModalOpen, openModal, closeModal] = useBoolean(false);

  const resetStatus = () => dispatch(reset());

  useEffect(() => {
    dispatch(fetchLines()).then(unwrapResult).then(resetStatus);

    return resetStatus;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAlertOpen = [
    status === STATUS.SUCCEED || status === STATUS.FAILED,
    message,
  ].every(Boolean);

  return (
    <>
      <Alert isOpen={isAlertOpen} onConfirm={resetStatus}>
        <p className="text-lg">{message}</p>
      </Alert>
      <Loading isLoading={status === STATUS.LOADING} />

      <LinesMain onAdd={openModal} />

      <Modal isOpen={isModalOpen} close={closeModal}>
        <LinesForm onSubmit={closeModal} />
      </Modal>
    </>
  );
};

export default Lines;
