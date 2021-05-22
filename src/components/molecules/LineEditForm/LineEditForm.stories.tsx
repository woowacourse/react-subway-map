import { Story } from '@storybook/react';
import LineEditForm, { LineEditFormProps } from './LineEditForm';

export default {
  title: 'molecule/LineEditForm',
  component: LineEditForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<LineEditFormProps> = args => <LineEditForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  addFormProps: {
    stationList: [
      { id: 1, name: '도비1' },
      { id: 2, name: '도비2' },
      { id: 3, name: '도비3' },
    ],
    upStation: 1,
    downStation: 2,
    distance: 10,
  },
};
