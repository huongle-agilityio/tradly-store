import { render, screen } from '@testing-library/react-native';
import { Skeleton } from '..';

jest.mock('react-native/Libraries/Animated/Animated', () => {
  const ActualAnimated = jest.requireActual(
    'react-native/Libraries/Animated/Animated',
  );

  return {
    ...ActualAnimated,
    timing: jest.fn(() => ({
      start: jest.fn(),
    })),
  };
});

describe('Skeleton Component', () => {
  it('renders correctly with given width, height, and borderRadius', () => {
    render(<Skeleton width={100} height={50} borderRadius={10} />);

    const skeletonContainer = screen.getByTestId('skeleton-container');

    expect(skeletonContainer).toHaveStyle({
      width: 100,
      height: 50,
      borderRadius: 10,
    });
  });

  it('applies custom styles correctly', () => {
    const customStyle = { backgroundColor: 'red' };
    render(<Skeleton width={100} height={50} style={customStyle} />);

    expect(screen.getByTestId('skeleton-container')).toHaveStyle(customStyle);
  });
});
