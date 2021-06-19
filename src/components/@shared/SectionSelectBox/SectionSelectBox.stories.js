import React from 'react';
import { DUMMY_STATIONS } from '../../../constants/dummies';
import Form from '../../@common/Form/Form';
import SectionSelectBox from './SectionSelectBox';

export default {
  title: 'shared/SectionSelectBox',
  component: SectionSelectBox,
  argTypes: {},
};

const Template = (args) => (
  <Form>
    <SectionSelectBox {...args} />
  </Form>
);
export const Default = Template.bind({});
Default.args = {};
