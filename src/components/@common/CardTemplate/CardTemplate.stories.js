import React from 'react';
import { THEME_COLOR } from '../../../constants/appInfo';
import CardTemplate from './CardTemplate';

export default {
  title: 'common/CardTemplate',
  component: CardTemplate,
  argTypes: {},
};

const Template = (args) => <CardTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <h3>Content</h3>,
  templateColor: THEME_COLOR[400],
  titleText: 'TITLE',
};

export const ColoredTitle = Template.bind({});
ColoredTitle.args = {
  children: <h3>Content</h3>,
  templateColor: THEME_COLOR[400],
  titleText: 'TITLE',
  isColoredTitle: true,
};

export const SmallTitle = Template.bind({});
SmallTitle.args = {
  children: <h3>Content</h3>,
  templateColor: THEME_COLOR[400],
  titleText: 'TITLE',
  isColoredTitle: true,
  titleSize: 'sm',
};

export const LargeTitle = Template.bind({});
LargeTitle.args = {
  children: <h3>Content</h3>,
  templateColor: THEME_COLOR[400],
  titleText: 'TITLE',
  isColoredTitle: true,
  titleSize: 'lg',
};
