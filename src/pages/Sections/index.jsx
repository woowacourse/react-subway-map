import React from "react";
import { useModal } from "../../components/@shared/Modal/hooks";
import SectionsMain from "../../components/SectionsMain";
import SectionsForm from "../../components/SectionsForm";
import Modal from "../../components/@shared/Modal";
import { useInput } from "../../components/@shared/Input/hooks";

const Sections = () => {
  const [isModalOpen, handleModalOpen, handleModalClose] = useModal(false);
  const [lineId, handleLineIdChange] = useInput();

  return (
    <>
      <SectionsMain
        lineId={lineId}
        openModal={handleModalOpen}
        onLineChange={handleLineIdChange}
      />

      <Modal isOpen={isModalOpen} close={handleModalClose}>
        <SectionsForm lineId={lineId} closeModal={handleModalClose} />
      </Modal>
    </>
  );
};

export default Sections;
