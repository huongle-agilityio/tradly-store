import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

// Components
import { CartItem } from '.';

const meta = {
  title: 'CartItem',
  component: CartItem,
  args: {
    id: '1',
    name: 'Beverages',
    image: 'https://picsum.photos/seed/696/3000/2000',
    quantity: 1,
    price: 10,
    discount: 0,
    onRemoveItem: action('onRemoveItem'),
    onUpdateQuantityItem: action('onUpdateQuantityItem'),
  },
  decorators: [
    (Story) => (
      <View style={{ width: '100%', height: 300 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
