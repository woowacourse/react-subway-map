import React from 'react';
import ModalProvider from '../../components/@common/ModalProvider/ModalProvider';
import Lines from './Lines';

export default {
  title: 'pages/Lines',
  component: Lines,
  argTypes: {},
};

const Template = (args) => (
  <ModalProvider>
    <Lines {...args} />
  </ModalProvider>
);

export const Default = Template.bind({});
