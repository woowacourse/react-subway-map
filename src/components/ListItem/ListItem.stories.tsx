import React from "react";
import { Story, Meta } from "@storybook/react";

import ListItem, { Props } from "./ListItem";

export default {
  title: "components/ListItem",
  component: ListItem,
} as Meta;

const Template: Story<Props> = (args) => <ListItem {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: "잠실역",
};
