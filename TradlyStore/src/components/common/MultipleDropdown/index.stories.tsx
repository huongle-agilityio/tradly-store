import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { MultipleDropdown } from '.';

// Mocks
import { CART_QUANTITY } from '@/mocks';

const meta = {
  title: 'MultipleDropdown',
  component: MultipleDropdown,
  args: {
    options: CART_QUANTITY,
    label: 'Additional Details',
    placeholder: 'Select Quantity',
    selectedItems: [],
    onChange: action('onPress'),
  },
} satisfies Meta<typeof MultipleDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const DropDownComponent = (props: any) => {
  const [value, setValue] = useState<string[]>([]);

  return <MultipleDropdown {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <DropDownComponent {...args} />,
  args: {},
};

export const withError: Story = {
  render: (args) => <DropDownComponent {...args} />,
  args: {
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  render: (args) => <DropDownComponent {...args} />,
  args: {
    disabled: true,
  },
};
