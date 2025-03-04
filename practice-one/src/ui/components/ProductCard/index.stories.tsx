import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProductCard } from '.';

const meta = {
  title: 'ProductCard',
  component: ProductCard,
  args: {
    source: require('@/assets/category-beverages.webp'),
    title: 'Beverages',
    storeName: 'Tradlyas',
    storeSource: require('@/assets/category-beverages.webp'),
    price: 10,
    onPress: fn(),
  },
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDiscount: Story = {
  args: {
    discount: 10,
    price: 30,
  },
};
