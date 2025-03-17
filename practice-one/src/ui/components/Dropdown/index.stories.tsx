import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Dropdown } from '.';

// Themes
import { CART_QUANTITY } from '@/mocks';

const meta = {
  title: 'Dropdown',
  component: Dropdown,
  args: {
    value: '1',
    items: CART_QUANTITY,
    onValueChange: action('onPress'),
    style: {
      inputAndroid: { width: 70 },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const DropDownComponent = (props: any) => {
  const [value, setValue] = useState('1');

  return <Dropdown {...props} value={value} onValueChange={setValue} />;
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
