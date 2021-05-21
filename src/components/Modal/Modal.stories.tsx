import React from "react";
import { Story, Meta } from "@storybook/react";

import Modal, { Props } from "./Modal";

export default {
  title: "Modal",
  component: Modal,
} as Meta;

const Template: Story<Props> = (args) => <Modal {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  closeModal: () => {},
  children: "children",
};
