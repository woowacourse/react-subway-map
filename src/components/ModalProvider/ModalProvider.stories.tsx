import React from "react";
import { Story, Meta } from "@storybook/react";

import ModalProvider, { Props } from "./ModalProvider";

export default {
  title: "components/Modal",
  component: ModalProvider,
} as Meta;

const Template: Story<Props> = (args) => <ModalProvider {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: "children",
};
