import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const Item = ({ name, onDeleteItem }) => (
  <li>
    <span>{name}</span>
    <button type="button" onClick={onDeleteItem}>
      🗑
    </button>
  </li>
);

const ManagementList = ({ items, onDeleteItem }) => (
  <Container>
    {items.map(({ id, name }) => (
      <Item key={id} name={name} onDeleteItem={() => onDeleteItem(id)} />
    ))}
  </Container>
);

ManagementList.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default ManagementList;
