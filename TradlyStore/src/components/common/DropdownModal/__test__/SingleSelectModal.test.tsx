import { Ref } from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

// Components
import { SingleSelectSheet } from '../SingleSelectSheet';

// Mocks
import { CART_QUANTITY } from '@/mocks';

// Mock OptionItem
jest.mock('../OptionItem', () => {
  const { Text } = require('react-native');

  return {
    OptionItem: ({
      value,
      label,
      onItemSelect,
    }: {
      value: string;
      label: string;
      onItemSelect: (value: string) => void;
    }) => (
      <Text testID={`option-${value}`} onPress={() => onItemSelect(value)}>
        {label}
      </Text>
    ),
  };
});

describe('SingleSelectSheet', () => {
  const sheetRef = { current: null } as Ref<BottomSheetMethods>;
  const mockOnItemSelect = jest.fn();
  const mockHandleCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should renders correctly with options', () => {
    render(
      <SingleSelectSheet
        sheetRef={sheetRef}
        data={CART_QUANTITY}
        selectedItem="a"
        onItemSelect={mockOnItemSelect}
        handleCloseModal={mockHandleCloseModal}
      />,
    );

    expect(screen.getByTestId('bottom-sheet')).toBeTruthy();
    expect(screen.getByTestId('bottom-sheet-flatlist')).toBeTruthy();

    // Expect all option items to be rendered
    CART_QUANTITY.forEach((item) => {
      expect(screen.getByTestId(`option-${item.value}`)).toBeTruthy();
      expect(screen.getByText(item.label)).toBeTruthy();
    });
  });

  it('Should calls onItemSelect and handleCloseModal when an option is pressed', () => {
    render(
      <SingleSelectSheet
        sheetRef={sheetRef}
        data={CART_QUANTITY}
        selectedItem="a"
        onItemSelect={mockOnItemSelect}
        handleCloseModal={mockHandleCloseModal}
      />,
    );

    const option = screen.getByTestId('option-1');
    fireEvent.press(option);

    expect(mockOnItemSelect).toHaveBeenCalledWith('1');
    expect(mockHandleCloseModal).toHaveBeenCalled();
  });
});
