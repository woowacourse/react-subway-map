import React from "react";
import { Story, Meta } from "@storybook/react";

import Line, { Props } from "./Line";

export default {
  title: "components/Line",
  component: Line,
} as Meta;

const Template: Story<Props> = (args) => <Line {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  line: {
    id: 1,
    name: "1호선",
    color: "bg-teal-300",
    stations: [
      { id: 1, name: "신림역" },
      { id: 2, name: "봉천역" },
      { id: 3, name: "서울대입구역" },
      { id: 4, name: "낙성대역" },
      { id: 5, name: "사당역" },
    ],
    sections: [],
  },
};
