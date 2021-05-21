import { ButtonHTMLAttributes } from "react";

import { ButtonBlock, ButtonStylesProps } from "./Button.styles";

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStylesProps;

const Button = (props: Props) => <ButtonBlock {...props} />;

export default Button;
