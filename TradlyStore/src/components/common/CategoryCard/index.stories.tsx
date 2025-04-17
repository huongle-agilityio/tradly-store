import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { CategoryCard } from '.';

// Constants
import { IMAGES } from '@/constants';

const meta = {
  title: 'CategoryCard',
  component: CategoryCard,
  args: {
    value: 'default value',
    source: IMAGES.CATEGORY_BEVERAGES,
    title: 'Beverages',
    onPress: action('onPress'),
    style: { width: 100, height: 100 },
  },
} satisfies Meta<typeof CategoryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
