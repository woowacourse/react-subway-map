import React from "react";
import { Story, Meta } from "@storybook/react";

import ModalProvider from "./ModalProvider";
import Modal, { Props } from "./Modal";

export default {
  title: "components/Modal",
  component: Modal,
} as Meta;

const Template: Story<Props> = (args) => (
  <ModalProvider>
    <Modal {...args} />
  </ModalProvider>
);

export const Basic = Template.bind({});

Basic.args = {
  children: "children",
};
