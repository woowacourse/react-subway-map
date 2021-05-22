import React from 'react';
import PALETTE from '../../../constants/palette';
import Add from '../../@common/Icon/Add';
import ButtonOnLine from './ButtonOnLine';

export default {
  title: 'shared/ButtonOnLine',
  component: ButtonOnLine,
  argTypes: {},
};

const Template = (args) => <ButtonOnLine {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <Add width="80%" color={PALETTE.GRAY[600]} />,
};
