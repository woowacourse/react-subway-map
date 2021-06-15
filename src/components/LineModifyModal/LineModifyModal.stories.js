import React, { useEffect } from 'react';
import { Palette } from '../../constants/palette';
import useModal from '../../hooks/@shared/useModal/useModal';
import ModalProvider from '../@common/ModalProvider/ModalProvider';
import LineModifyModal from './LineModifyModal';

export default {
  title: 'modal/LineModifyModal',
  component: LineModifyModal,
  argTypes: {},
};

const Template = ({ line }) => (
  <ModalProvider>
    <LineModifyModal line={line} />
  </ModalProvider>
);

export const Default = Template.bind({});
Default.args = {
  line: { id: 1, name: '밍키선', color: Palette.RED_400 },
};
