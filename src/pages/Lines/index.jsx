import React from "react";
import { useModal } from "../../components/@shared/Modal/hooks";
import Modal from "../../components/@shared/Modal";
import LinesMain from "../../components/LinesMain";
import LinesForm from "../../components/LinesForm";

const Lines = () => {
  const [isModalOpen, handleModalOpen, handleModalClose] = useModal(false);

  return (
    <>
      <LinesMain openModal={handleModalOpen} />

      <Modal close={handleModalClose} isOpen={isModalOpen}>
        <LinesForm closeModal={handleModalClose} />
      </Modal>
    </>
  );
};

export default Lines;
