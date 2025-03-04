import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { CategoryCard } from '.';

const meta = {
  title: 'CategoryCard',
  component: CategoryCard,
  args: {
    source: require('@/assets/category-beverages.webp'),
    title: 'Beverages',
    onPress: fn(),
  },
} satisfies Meta<typeof CategoryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
