import React, { useState } from "react";
import { useModal } from "../../components/@shared/Modal/hooks";
import SectionsMain from "../../components/SectionsMain";
import SectionsForm from "../../components/SectionsForm";
import Modal from "../../components/@shared/Modal";

const Sections = () => {
  const [isModalOpen, handleModalOpen, handleModalClose] = useModal(false);

  const [lineId, setLineId] = useState(-1);
  const handleLineIdChange = (event) => setLineId(Number(event.target.value));

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
