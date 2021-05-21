import React from "react";
import { Story, Meta } from "@storybook/react";

import Button, { Props } from "./Button";

export default {
  title: "components/Button",
  component: Button,
} as Meta;

const Template: Story<Props> = (args) => <Button {...args}>TEST</Button>;

export const Basic = Template.bind({});

Basic.args = {};
