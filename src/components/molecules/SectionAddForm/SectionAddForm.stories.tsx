import { Story } from '@storybook/react';
import SectionAddForm, { SectionAddFormProps } from './SectionAddForm';

export default {
  title: 'molecule/SectionAddForm',
  component: SectionAddForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<SectionAddFormProps> = args => <SectionAddForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  lineList: [
    { id: 1, name: '도비1', upStationId: 1, downStationId: 2, distance: 10 },
    { id: 1, name: '도비1', upStationId: 1, downStationId: 2, distance: 10 },
    { id: 1, name: '도비1', upStationId: 1, downStationId: 2, distance: 10 },
  ],
};
