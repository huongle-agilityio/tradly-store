import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProductCard } from '.';

// Constants
import { IMAGES } from '@/constants';

const meta = {
  title: 'ProductCard',
  component: ProductCard,
  args: {
    source: IMAGES.CATEGORY_BEVERAGES,
    title: 'Beverages',
    storeName: 'Tradlyas',
    storeSource: IMAGES.CATEGORY_BEVERAGES,
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
