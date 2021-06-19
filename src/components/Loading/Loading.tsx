import { LoadingBlock, Left, Center, Right } from "./Loading.style";
import { LoadingBlockProps } from "./Loading.style";

import { COLOR } from "../../constants";

export type Props = Partial<LoadingBlockProps>;

const Loading = ({ bgColor = COLOR.CYAN_400 }: Props) => (
  <LoadingBlock bgColor={bgColor}>
    <Left />
    <Center />
    <Right />
  </LoadingBlock>
);

export default Loading;
