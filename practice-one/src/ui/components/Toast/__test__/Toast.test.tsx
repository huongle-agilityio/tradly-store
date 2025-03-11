import { render, screen } from '@testing-library/react-native';

// Components
import { Toast } from '..';

// Stores
import * as stores from '@/stores';

jest.mock('@/stores', () => ({
  useToast: jest.fn(),
}));

describe('Toast Component', () => {
  jest.useFakeTimers();

  it('should render toast with description', () => {
    jest.spyOn(stores, 'useToast').mockReturnValue({ closeToast: jest.fn() });

    render(<Toast description="This is a test toast" />);

    expect(screen.getByText('This is a test toast')).toBeTruthy();
  });

  it('should not render toast when description is empty', () => {
    jest.spyOn(stores, 'useToast').mockReturnValue({ closeToast: jest.fn() });

    render(<Toast description="" />);

    expect(screen.queryByText('This is a test toast')).toBeNull();
  });
});
