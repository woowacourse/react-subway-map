import React from 'react';
import ModalProvider from '../../components/@common/ModalProvider/ModalProvider';
import Sections from './Sections';

export default {
  title: 'pages/Sections',
  component: Sections,
  argTypes: {},
};

const Template = (args) => (
  <ModalProvider>
    <Sections {...args} />
  </ModalProvider>
);

export const Default = Template.bind({});
