import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Image } from '.';

const meta = {
  title: 'Image',
  component: Image,
  argTypes: {
    source: {
      control: 'text',
      description: 'Image URL to be displayed',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    contentFit: {
      control: 'inline-radio',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
    },
    transition: {
      control: 'number',
      description: 'Transition duration in milliseconds',
    },
  },
  args: {
    source: require('@/assets/splash-icon-dark.png'),
    alt: 'Sample Image',
    contentFit: 'cover',
    transition: 1000,
    styles: { width: 150, height: 150, borderRadius: 10 },
  },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithUrl: Story = {
  args: {
    source: 'https://picsum.photos/seed/696/3000/2000',
  },
};

export const WithPlaceholder: Story = {
  args: {
    source: 'https://picsum.photos/seed',
  },
};
