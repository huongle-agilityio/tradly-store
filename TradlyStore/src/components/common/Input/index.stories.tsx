import { useState } from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Input } from '.';

// Icons
import { SearchIcon } from '@/components/icons';

// Themes
import { colors } from '@/themes';

const meta = {
  title: 'Input',
  component: Input,
  argTypes: {
    onChangeText: { action: 'onChangeText' },
    variant: {
      control: 'inline-radio',
      options: ['default', 'outlined', 'underlined'],
    },
  },
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
  args: {
    value: '',
    onChangeText: action('onPress'),
    placeholder: 'First Name',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;
const InputWrapper = (props: any) => {
  const [value, setValue] = useState('');

  return <Input {...props} value={value} onChangeText={setValue} />;
};

export const Default: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    variant: 'default',
  },
};

export const withError: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    variant: 'default',
    error: 'This field is required',
  },
};

export const withLabel: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    label: 'First Name',
    variant: 'underlined',
  },
};

export const withIcon: Story = {
  render: (args) => <InputWrapper {...args} />,
  argTypes: {
    icon: {
      mapping: {
        store: <SearchIcon size={24} color={colors.primary} />,
      },
    },
  },
  args: {
    icon: 'store',
    variant: 'outlined',
  },
};

export const Disabled: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    disabled: true,
  },
};
