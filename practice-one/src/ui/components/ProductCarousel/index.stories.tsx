import { View } from 'react-native';
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
