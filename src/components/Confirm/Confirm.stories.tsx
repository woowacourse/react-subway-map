import React from "react";
import { Story, Meta } from "@storybook/react";

import Confirm, { Props } from "./Confirm";
import ModalProvider from "../Modal/ModalProvider";

export default {
  title: "components/Confirm",
  component: Confirm,
} as Meta;

const Template: Story<Props> = (args) => (
  <ModalProvider>
    <Confirm {...args} />
  </ModalProvider>
);
export const Basic = Template.bind({});

Basic.args = {
  title: "title",
  onConfirm: () => {},
  onReject: () => {},
};
