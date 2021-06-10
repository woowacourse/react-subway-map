import React from 'react';
import { PropTypes } from 'prop-types';

import { TopLine, Container, Heading, Content } from './style';

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
