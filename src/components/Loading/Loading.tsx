import React from "react";

import { LoadingBlock, Left, Center, Right } from "./Loading.style";
import { LoadingBlockProps } from "./Loading.style";

import { COLOR } from "../../constants/color";

export type Props = Partial<LoadingBlockProps>;

const Loading = ({ bgColor = COLOR.PURPLE_300 }: Props) => (
  <LoadingBlock bgColor={bgColor}>
    <Left />
    <Center />
    <Right />
  </LoadingBlock>
);

export default Loading;
