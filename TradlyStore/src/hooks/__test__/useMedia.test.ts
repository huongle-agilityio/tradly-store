import { renderHook } from '@testing-library/react-native';
import { useWindowDimensions } from 'react-native';
import { useMedia } from '../useMedia';

const mockUseWindowDimensions = jest.fn();
jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
  default: mockUseWindowDimensions,
}));

describe('useMedia', () => {
  it('Should return isMobile = true when width is smaller than TABLET size', () => {
    (useWindowDimensions as jest.Mock).mockReturnValue({
      width: 500,
      height: 1000,
    });

    const { result } = renderHook(() => useMedia());

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(1000);
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
  });

  it('Should return isTablet = true when width is TABLET size or larger', () => {
    (useWindowDimensions as jest.Mock).mockReturnValue({
      width: 900,
      height: 1000,
    });

    const { result } = renderHook(() => useMedia());

    expect(result.current.width).toBe(900);
    expect(result.current.height).toBe(1000);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
  });
});
