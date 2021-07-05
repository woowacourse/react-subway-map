import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBoolean from "../../hooks/useBoolean";
import useFetchOnce from "../../hooks/useFetchOnce";
import STATUS from "../../constants/status";
import {
  fetchLines,
  reset as resetLines,
  selectLinesMessage,
  selectLinesStatus,
} from "../Lines/slice";
import { fetchStations, reset as resetStations } from "../Stations/slice";
import Alert from "../../components/@shared/Alert";
import Loading from "../../components/@shared/Loading";
import Modal from "../../components/@shared/Modal";
import SectionsMain from "../../components/SectionsMain";
import SectionsForm from "../../components/SectionsForm";

const Sections = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLinesStatus);
  const message = useSelector(selectLinesMessage);
  const [isModalOpen, openModal, closeModal] = useBoolean(false);
  const [selectedLineId, setSelectedLineId] = useState(null);

  const setInitialLineId = useCallback((list) => {
    if (list.length > 0) {
      setSelectedLineId(list[list.length - 1].id);
    }
  }, []);

  useFetchOnce({
    fetch: fetchLines,
    reset: resetLines,
    callback: setInitialLineId,
  });

  useFetchOnce({
    fetch: fetchStations,
    reset: resetStations,
  });

  const handleLineIdChange = (event) =>
    setSelectedLineId(Number(event.target.value));

  const handleAlertConfirm = () => dispatch(resetLines());

  return (
    <>
      <Alert onConfirm={handleAlertConfirm} message={message} />

      <Loading isLoading={status === STATUS.LOADING} />

      <SectionsMain
        lineId={selectedLineId}
        onAdd={openModal}
        onLineChange={handleLineIdChange}
      />

      {selectedLineId && (
        <Modal isOpen={isModalOpen} close={closeModal}>
          <SectionsForm lineId={selectedLineId} onSubmit={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default Sections;
