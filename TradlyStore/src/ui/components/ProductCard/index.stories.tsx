import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProductCard } from '.';

const meta = {
  title: 'ProductCard',
  component: ProductCard,
  args: {
    source: 'https://picsum.photos/seed/696/3000/2000',
    title: 'Beverages',
    storeName: 'Tradlyas',
    storeSource: 'https://picsum.photos/seed/696/3000/2000',
    price: 10,
    onPress: action('onPress'),
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
