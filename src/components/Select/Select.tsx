import { SelectHTMLAttributes } from "react";

import { SelectBlock, SelectStylesProps } from "./Select.styles";

export type Props = SelectHTMLAttributes<HTMLSelectElement> & SelectStylesProps;

const Select = (props: Props) => <SelectBlock {...props} />;

export default Select;
