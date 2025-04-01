import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Text } from '.';

const meta = {
  title: 'Text',
  component: Text,
  argTypes: {
    color: {
      control: 'inline-radio',
      options: [
        'default',
        'light',
        'primary',
        'link',
        'fade',
        'secondary',
        'tertiary',
        'quaternary',
        'placeholder',
        'error',
        'success',
      ],
    },
    fontSize: {
      control: 'inline-radio',
      options: ['xxs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
    },
    fontWeight: {
      control: 'inline-radio',
      options: ['light', 'normal', 'medium', 'bold'],
    },
  },
  args: {
    color: 'default',
    fontSize: 'base',
    fontWeight: 'normal',
    children: 'Sample Text',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Sample Text',
  },
};

export const Bold: Story = {
  args: {
    fontWeight: 'bold',
    children: 'Bold Text',
  },
};

export const Large: Story = {
  args: {
    fontSize: 'xxxl',
    children: 'Large Text',
  },
};

export const Colored: Story = {
  args: {
    color: 'primary',
    children: 'Primary Color Text',
  },
};
