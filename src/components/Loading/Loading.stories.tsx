import { Story, Meta } from "@storybook/react";

import Loading, { Props } from "./Loading";

import { COLOR } from "../../constants/color";

export default {
  title: "components/Loading",
  component: Loading,
} as Meta;

const Template: Story<Props> = (args) => <Loading {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  bgColor: COLOR.TEAL_300,
};
