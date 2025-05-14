import { render, screen } from '@testing-library/react-native';

// Components
import { Toast } from '..';

jest.mock('@/stores', () => ({
  useToast: jest.fn(),
}));

describe('Toast Component', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    jest.useFakeTimers(); // use fake timers
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // ensure no timers are hanging
    jest.useRealTimers();
  });
  it('renders correctly with default props', () => {
    render(<Toast description="Test toast message" />);

    expect(screen.getByText('Test toast message')).toBeTruthy();
  });

  it('renders with error variant', () => {
    render(<Toast description="Error occurred" variant="error" />);

    expect(screen.getByText('Error occurred')).toBeTruthy();
  });
});
