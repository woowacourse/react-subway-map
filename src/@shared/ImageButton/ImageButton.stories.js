import React from 'react';
import addImg from 'assets/images/add.png';
import ImageButton from './ImageButton';

export default {
  title: 'shared/ImageButton',
  component: ImageButton,
};

const Template = (args) => <ImageButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  imgUrl: addImg,
};
