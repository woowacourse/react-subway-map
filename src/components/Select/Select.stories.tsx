import React from "react";
import { Story, Meta } from "@storybook/react";

import Select, { Props } from "./Select";

export default {
  title: "components/Select",
  component: Select,
} as Meta;

const Template: Story<Props> = (args) => <Select {...args} />;

export const Basic = Template.bind({});
