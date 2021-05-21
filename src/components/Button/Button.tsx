import { ButtonHTMLAttributes } from "react";

import { ButtonBlock, ButtonBlockProps } from "./Button.styles";

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonBlockProps;

const Button = (props: Props) => <ButtonBlock {...props} />;

export default Button;
