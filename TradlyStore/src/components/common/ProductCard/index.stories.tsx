import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProductCard } from '.';

// Mocks
import { IMAGES } from '@/mocks';

const meta = {
  title: 'ProductCard',
  component: ProductCard,
  args: {
    source: IMAGES,
    title: 'Beverages',
    storeName: 'Tradlya',
    storeSource: IMAGES,
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
