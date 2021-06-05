import { Story } from '@storybook/react';
import LineLookUp, { ILineLoopUpProp } from './LineLookUp';

export default {
  title: 'molecule/LineLookUp',
  component: LineLookUp,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<ILineLoopUpProp> = args => <LineLookUp {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
