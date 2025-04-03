import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProductCarousel } from '.';

// Mocks
import { LIST_IMAGES } from '@/mocks';

const meta = {
  title: 'ProductCarousel',
  component: ProductCarousel,
  args: {
    images: LIST_IMAGES,
    name: 'Beverages',
  },
  decorators: [
    (Story) => (
      <View style={{ width: '100%', height: 300 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ProductCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
