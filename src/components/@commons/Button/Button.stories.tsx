import Button, { Props } from './Button';

export default {
  title: 'Commons/Button',
  component: Button,
  argTypes: {},
};

const Template = (args: Props) => <Button {...args}>버튼</Button>;
export const Default = Template.bind({});
