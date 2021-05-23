import { Story } from '@storybook/react';
import SectionAddForm, { SectionAddFormProps } from './SectionAddForm';

export default {
  title: 'molecule/SectionAddForm',
  component: SectionAddForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<SectionAddFormProps> = args => <SectionAddForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
