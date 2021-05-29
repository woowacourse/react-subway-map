import { FC, SelectHTMLAttributes } from 'react';
import StyledSelectBox, { Label, LabelText } from './SelectBox.styles';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {}

const SelectBox: FC<Props> = ({
  className,
  children,
  defaultValue,
  placeholder,
  value,
  ...args
}) => {
  return (
    <Label className={className}>
      <StyledSelectBox value={value} {...args}>
        <option value={defaultValue} disabled selected hidden>
          {placeholder}
        </option>
        {children}
      </StyledSelectBox>
      {value !== defaultValue && <LabelText>{placeholder}</LabelText>}
    </Label>
  );
};

export default SelectBox;
