import React from "react";
import { Story, Meta } from "@storybook/react";

import Select, { Props } from "./Select";

export default {
  title: "components/Select",
  component: Select,
} as Meta;

const Template: Story<Props> = (args) => <Select {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  options: [
    { value: 1, text: "1" },
    { value: 2, text: "2" },
    { value: 3, text: "3" },
    { value: 4, text: "4" },
    { value: 5, text: "5" },
  ],
};
