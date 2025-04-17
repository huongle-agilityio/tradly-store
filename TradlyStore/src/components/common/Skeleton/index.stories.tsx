import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Skeleton } from '.';

const meta = {
  title: 'Skeleton',
  component: Skeleton,
  args: {
    width: 100,
    height: 20,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
