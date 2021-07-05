import { Story } from '@storybook/react';

import SectionGraph, { SectionGraphProps } from './SectionGraph';

export default {
  title: 'components/SectionGraph',
  component: SectionGraph,
};

const Template: Story<SectionGraphProps> = (args) => <SectionGraph {...args} />;

export const Default = Template.bind({});

Default.args = {
  line: {
    id: 1,
    name: '신분당선',
    color: 'ORANGE',
    stations: [
      {
        id: 1,
        name: '강남역',
        distance: 10,
      },
      {
        id: 2,
        name: '판교역',
        distance: 10,
      },
      {
        id: 3,
        name: '정자역',
      },
    ],
  },
};
