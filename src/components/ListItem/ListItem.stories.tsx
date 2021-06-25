import React from "react";
import { Story, Meta } from "@storybook/react";

import ListItem, { Props } from "./ListItem";
import ModalProvider from "../Modal/ModalProvider";

export default {
  title: "components/ListItem",

  component: ListItem,
} as Meta;

const Template: Story<Props> = (args) => (
  <ModalProvider>
    <ListItem {...args} />
  </ModalProvider>
);

export const Basic = Template.bind({});

Basic.args = {
  children: "잠실역",
};
