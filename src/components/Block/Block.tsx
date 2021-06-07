import { HTMLAttributes } from "react";
import { BlockBlock } from "./Block.styles";

export type Props = HTMLAttributes<HTMLDivElement>;

const Block = ({ ...props }: Props) => <BlockBlock {...props} />;

export default Block;
