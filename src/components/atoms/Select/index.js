import React from 'react';
import PropTypes from 'prop-types';

import { Selector, Option } from './style';

export const Select = (props) => {
  const { id, name, optionHead, options, selectProps, ...rest } = props;

  return (
    <label htmlFor={id} {...rest}>
      <Selector id={id} name={name} required {...selectProps}>
        <Option value="" defaultValue hidden>
          {optionHead}
        </Option>
        {options.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.name}
          </Option>
        ))}
      </Selector>
    </label>
  );
};

Select.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  optionHead: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectProps: PropTypes.object,
};
