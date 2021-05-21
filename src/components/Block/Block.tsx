import { HTMLAttributes } from "react";
import { BlockBlock, BlockStylesProps } from "./Block.styles";

export interface Props extends BlockStylesProps, HTMLAttributes<HTMLDivElement> {
  errorMessage?: string;
}

const Block = ({ ...props }: Props) => {
  return <BlockBlock {...props} />;
};

export default Block;
