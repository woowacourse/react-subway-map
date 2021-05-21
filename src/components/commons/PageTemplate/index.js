import React from 'react';
import PropTypes from 'prop-types';
import { Container, Title } from './style';

const PageTemplate = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
