import React from "react";
import { Story, Meta } from "@storybook/react";

import Loading, { Props } from "./Loading";

export default {
  title: "components/Loading",
  component: Loading,
} as Meta;

const Template: Story<Props> = (args) => <Loading {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
