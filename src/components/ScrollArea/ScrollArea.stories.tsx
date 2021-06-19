import React from "react";
import { Story, Meta } from "@storybook/react";

import ScrollArea, { Props } from "./ScrollArea";
import TrainIconPNG from "../../assets/images/train-icon.png";

export default {
  title: "components/ScrollArea",
  component: ScrollArea,
} as Meta;

const Template: Story<Props> = (args) => <ScrollArea {...args} />;

export const Basic = Template.bind({});
export const TrainScorllArea = Template.bind({});

Basic.args = {
  children: (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  ),
};

TrainScorllArea.args = {
  imageUrl: TrainIconPNG,
  children: (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  ),
};
