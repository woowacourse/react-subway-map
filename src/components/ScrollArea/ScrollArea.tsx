import { HTMLAttributes } from "react";
import { ScrollAreaBlock } from "./ScrollArea.styles";

import { ScrollAreaStylesProps } from "./ScrollArea.styles";
export type Props = ScrollAreaStylesProps & HTMLAttributes<HTMLDivElement>;

// TODO: 스크롤 끝까지 안내려감(열차 이미지)
const ScrollArea = ({ children, ...props }: Props) => (
  <ScrollAreaBlock dir="rtl" {...props}>
    <div dir="ltr">{children}</div>
  </ScrollAreaBlock>
);

export default ScrollArea;
