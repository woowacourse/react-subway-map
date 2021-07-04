import { PropTypes } from 'prop-types';
import React from 'react';

import { Container, Content, Heading, TopLine } from './style';

export const Section = (props) => {
  const { children, heading, ...rest } = props;

  return (
    <>
      <TopLine />
      <Container {...rest}>
        <Heading>{heading}</Heading>
        <Content>{children}</Content>
      </Container>
    </>
  );
};

Section.prototypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.node.isRequired,
};
