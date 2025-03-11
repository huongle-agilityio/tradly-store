import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Button } from '.';

// Icons
import { StoreIcon } from '@/ui/icons';

// Themes
import { colors } from '@/ui/themes';

const meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    onPress: { action: 'pressed the button' },
    variant: {
      control: 'inline-radio',
      options: ['solid', 'bordered', 'ghost'],
    },
    size: {
      control: 'inline-radio',
      options: ['none', 'small', 'medium', 'full'],
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'dark', 'success', 'error'],
    },
    textSize: {
      control: 'inline-radio',
      options: ['xs', 'base', 'md', 'lg', 'xl'],
    },
  },
  args: {
    size: 'medium',
    color: 'primary',
    variant: 'solid',
    textSize: 'base',
    children: 'Hello world',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello world',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithIcon: Story = {
  decorators: [
    (Story) => (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor: colors.primary,
        }}
      >
        <Story />
      </View>
    ),
  ],
  argTypes: {
    icon: {
      mapping: {
        store: (
          <StoreIcon size={16} color={colors.button.backgroundSecondary} />
        ),
      },
    },
  },
  args: {
    icon: 'store',
    color: 'secondary',
    variant: 'bordered',
  },
};
