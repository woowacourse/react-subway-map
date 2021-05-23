import { FC, SelectHTMLAttributes } from 'react';
import StyledSelectBox, { Label } from './SelectBox.styles';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {}

const SelectBox: FC<Props> = ({ children, placeholder, className }) => {
  return (
    <Label className={className}>
      <StyledSelectBox>{children}</StyledSelectBox>
    </Label>
  );
};

export default SelectBox;
