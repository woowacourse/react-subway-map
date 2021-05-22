import React from "react";
import { Story, Meta } from "@storybook/react";

import Header, { Props } from "./Header";

export default {
  title: "components/Header",
  component: Header,
} as Meta;

const Template: Story<Props> = (args) => <Header {...args}>TEST</Header>;

export const Basic = Template.bind({});

Basic.args = {};
