import { Story } from '@storybook/react';
import ColorButton, { ColorButtonProps } from './ColorButton';

export default {
  title: 'atoms/ColorButton',
  component: ColorButton,
  argTypes: { children: { control: 'text' }, bgColor: { control: 'color' } },
};

const Template: Story<ColorButtonProps> = args => <ColorButton {...args} />;

export const DefaultColorButton = Template.bind({});

DefaultColorButton.args = {
  bgColor: '#14e147',
  onClick: () => {
    alert('호선 선택 버튼');
  },
};
