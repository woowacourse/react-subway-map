import { Meta, Story } from '@storybook/react';
import StationList, { StationProps } from './StationList';

export default {
  title: 'Components/StationManageMent/StationList',
  component: StationList,
  argTypes: {
    onSubmit: { action: 'submitted' },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<StationProps> = (args) => {
  return <StationList {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  stations: [],
};
