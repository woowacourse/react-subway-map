import React from "react";
import { Story, Meta } from "@storybook/react";

import Input, { Props } from "./Input";

export default {
  title: "components/Input",
  component: Input,
} as Meta;

const Template: Story<Props> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
export const WithErrorMessage = Template.bind({});

Basic.args = {
  placeholder: "역 이름",
};

WithErrorMessage.args = {
  errorMessage: "에러 메세지",
};
