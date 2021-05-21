import React from "react";
import { Story, Meta } from "@storybook/react";

import Button, { Props } from "./Button";

export default {
  title: "components/Button",
  component: Button,
} as Meta;

const Template: Story<Props> = (args) => <Button {...args}>TEST</Button>;

export const Rect = Template.bind({});
export const Eclipse = Template.bind({});
export const Primary = Template.bind({});
export const Gray = Template.bind({});
export const White = Template.bind({});

Rect.args = {
  kind: "rect",
};

Eclipse.args = {
  kind: "eclipse",
};

Primary.args = {
  buttonTheme: "primary",
};

Gray.args = {
  buttonTheme: "gray",
};

White.args = {
  buttonTheme: "white",
};
