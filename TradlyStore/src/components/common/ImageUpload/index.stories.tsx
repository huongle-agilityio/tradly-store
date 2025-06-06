import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ImageUpload } from '.';

// Mocks
import { IMAGES } from '@/mocks';

const meta = {
  title: 'ImageUpload',
  component: ImageUpload,
  args: {
    id: 0,
    image: IMAGES,
    onPress: action('onPress'),
  },
} satisfies Meta<typeof ImageUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
