import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useBoolean from "../../hooks/useBoolean";
import useFetchOnce from "../../hooks/useFetchOnce";
import STATUS from "../../constants/status";
import {
  fetchLines as fetch,
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

  useFetchOnce({ fetch, reset });

  const handleAlertConfirm = () => dispatch(reset());

  const isAlertOpen = [
    status === STATUS.SUCCEED || status === STATUS.FAILED,
    message,
  ].every(Boolean);

  return (
    <>
      <Alert isOpen={isAlertOpen} onConfirm={handleAlertConfirm}>
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
