import React from "react";
import { Story, Meta } from "@storybook/react";

import Block, { Props } from "./Block";
import Button from "../Button/Button";

export default {
  title: "components/Block",
  component: Block,
} as Meta;

const Template: Story<Props> = (args) => <Block {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: <Button>내용물</Button>,
};
