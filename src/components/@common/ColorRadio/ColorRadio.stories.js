import React from 'react';
import { THEME_COLOR } from '../../../constants/appInfo';
import ColorRadio from './ColorRadio';

export default {
  title: 'common/ColorRadio',
  component: ColorRadio,
  argTypes: {},
};

const Template = (args) => <ColorRadio {...args} />;

export const Default = Template.bind({});
Default.args = {
  radioColor: THEME_COLOR[400],
  labelText: '노랑노랑',
  isChecked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  radioColor: THEME_COLOR[400],
  labelText: '노랑노랑',
  isChecked: true,
};
