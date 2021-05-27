import { FC, SelectHTMLAttributes } from 'react';
import StyledSelectBox, { Label } from './SelectBox.styles';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {}

const SelectBox: FC<Props> = ({
  children,
  placeholder,
  className,
  onChange,
}) => {
  return (
    <Label className={className}>
      <StyledSelectBox onChange={onChange}>{children}</StyledSelectBox>
    </Label>
  );
};

export default SelectBox;
