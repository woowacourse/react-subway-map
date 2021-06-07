import Modal, { Props } from './Modal';

export default {
  title: 'Commons/Modal',
  component: Modal,
  argTypes: {},
};

const Template = (args: Props) => <Modal {...args}>모달컨텐츠</Modal>;
export const Default = Template.bind({});
