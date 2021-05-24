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
  labelText: { text: '노랑노랑', isVisible: true },
  isChecked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  radioColor: THEME_COLOR[400],
  labelText: { text: '노랑노랑', isVisible: true },
  isChecked: true,
};

export const WithoutLabelText = Template.bind({});
WithoutLabelText.args = {
  radioColor: THEME_COLOR[400],
  labelText: { text: '노랑노랑', isVisible: false },
  isChecked: true,
};
