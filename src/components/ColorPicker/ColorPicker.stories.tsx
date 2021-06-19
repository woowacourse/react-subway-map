import React from "react";
import { Story, Meta } from "@storybook/react";

import ColorPicker, { Props } from "./ColorPicker";

export default {
  title: "components/ColorPicker",
  component: ColorPicker,
} as Meta;

const Template: Story<Props> = (args) => <ColorPicker {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
