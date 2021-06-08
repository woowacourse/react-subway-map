import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';
import { ConfirmModal } from '..';
import { useModal } from '../../hooks';

const Item = ({ name, onClickDeleteButton }) => (
  <li>
    <span>{name}</span>
    <button type="button" onClick={onClickDeleteButton}>
      🗑
    </button>
  </li>
);

const ManagementList = ({ items, deleteItem }) => {
  const [deleteId, setDeleteId] = useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Container>
        {items.map(({ id, name }) => (
          <Item
            key={id}
            name={name}
            onClickDeleteButton={() => {
              openModal();
              setDeleteId(id);
            }}
          />
        ))}
      </Container>
      {isModalOpen && (
        <ConfirmModal
          onClose={closeModal}
          onConfirm={() => {
            deleteItem({ id: deleteId });
            setDeleteId(null);
          }}
        >
          <span>정말 삭제하시겠습니까?</span>
        </ConfirmModal>
      )}
    </>
  );
};

ManagementList.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default ManagementList;
