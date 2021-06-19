import { HTMLAttributes } from "react";
import { ScrollAreaBlock } from "./ScrollArea.styles";

import { ScrollAreaBlockProps } from "./ScrollArea.styles";
export type Props = HTMLAttributes<HTMLDivElement> & ScrollAreaBlockProps;

// TODO: 스크롤 끝까지 안내려감(열차 이미지)
const ScrollArea = ({ children, ...props }: Props) => (
  <ScrollAreaBlock dir="rtl" {...props}>
    {children}
  </ScrollAreaBlock>
);

export default ScrollArea;
