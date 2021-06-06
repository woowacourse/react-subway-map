import { Story } from '@storybook/react';
import { SelectHTMLAttributes } from 'react';

import Select from './Select';

export default {
  title: 'components/shared/Select',
  component: Select,
};

const Template: Story<SelectHTMLAttributes<HTMLSelectElement>> = (args) => <Select {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      {['option1', 'option2', 'option3'].map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </>
  ),
  value: 'MALCHA',
  onChange: () => {},
};
