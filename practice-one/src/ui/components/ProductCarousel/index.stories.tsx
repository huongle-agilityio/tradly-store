import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProductCarousel } from '.';

const meta = {
  title: 'ProductCarousel',
  component: ProductCarousel,
  args: {
    images: [
      'https://picsum.photos/seed/696/3000/2000',
      'https://picsum.photos/seed/696/3000/2000',
      'https://picsum.photos/seed/696/3000/2000',
      'https://picsum.photos/seed/696/3000/2000',
      'https://picsum.photos/seed/696/3000/2000',
    ],
    name: 'Beverages',
  },
} satisfies Meta<typeof ProductCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
