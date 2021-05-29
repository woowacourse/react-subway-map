import { FC, SelectHTMLAttributes } from 'react';
import StyledSelectBox, { Label } from './SelectBox.styles';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {}

const SelectBox: FC<Props> = ({ className, children, ...args }) => {
  return (
    <Label className={className}>
      <StyledSelectBox {...args}>{children}</StyledSelectBox>
    </Label>
  );
};

export default SelectBox;
