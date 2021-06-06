import { Story, Meta } from "@storybook/react";

import ErrorMessage, { Props } from "./ErrorMessage";

export default {
  title: "components/ErrorMessage",
  component: ErrorMessage,
} as Meta;

const Template: Story<Props> = (args) => <ErrorMessage {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: <p>에러메시지 입니다.</p>,
};
