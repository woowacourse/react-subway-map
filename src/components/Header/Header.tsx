import { HTMLAttributes } from "react";
import { HeaderBlock } from "./Header.styles";

export type Props = HTMLAttributes<HTMLDivElement>;

const Header = ({ children, ...props }: Props) => (
  <HeaderBlock {...props}>
    <h1>{children}</h1>
  </HeaderBlock>
);

export default Header;
