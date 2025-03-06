import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Select } from '.';

// Themes
import { CART_QUANTITY } from '@/mocks';
import { useState } from 'react';

const meta = {
  title: 'Select',
  component: Select,
  args: {
    value: '1',
    options: CART_QUANTITY,
    onValueChange: action('onPress'),
    style: {
      width: 100,
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const SelectWrapper = (props: any) => {
  const [value, setValue] = useState('1');

  return <Select {...props} value={value} onValueChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {},
};

export const withError: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    disabled: true,
  },
};
