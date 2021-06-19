import React from "react";
import { Story, Meta } from "@storybook/react";

import LabeledNode, { Props } from "./LabeledNode";

export default {
  title: "components/LabeledNode",
  component: LabeledNode,
} as Meta;

const Template: Story<Props> = (args) => <LabeledNode {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  title: "5호선",
  content: <li>test</li>,
};
