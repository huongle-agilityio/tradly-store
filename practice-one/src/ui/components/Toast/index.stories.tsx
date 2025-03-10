import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Toast } from '.';
import { Button } from '../Button';

// Stores
import { useToast } from '@/stores';

// Interfaces
import { ToastColor } from '@/interfaces';

const meta = {
  title: 'Toast',
  component: Toast,
  args: {
    description: 'This is a toast',
    variant: 'default',
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const ToastWrapper = ({
  description,
  variant = 'default',
}: {
  description: string;
  variant?: ToastColor;
}) => {
  const showToast = useToast((state) => state.showToast);

  const handleShowToast = () => {
    showToast({
      description: description,
      variant: variant,
    });
  };

  return (
    <View>
      <Button
        onPress={handleShowToast}
        buttonStyles={{ height: 30, width: 150 }}
      >
        Open Toast
      </Button>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <ToastWrapper {...args} />,
};

export const Success: Story = {
  render: (args) => <ToastWrapper {...args} />,
  args: {
    variant: 'success',
  },
};

export const Error: Story = {
  render: (args) => <ToastWrapper {...args} />,
  args: {
    variant: 'error',
  },
};
