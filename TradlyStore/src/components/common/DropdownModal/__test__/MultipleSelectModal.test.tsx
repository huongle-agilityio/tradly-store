import { createRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

// Components
import { MultipleSelectSheet } from '../MultipleSelectSheet';

// Interfaces
import { Option } from '@/interfaces';

const mockData: Option[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
];

const mockOnItemSelect = jest.fn();

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

describe('MultipleSelectSheet', () => {
  it('Should renders BottomSheet with data items', () => {
    const ref = createRef<BottomSheetMethods>();

    render(
      <MultipleSelectSheet
        sheetRef={ref}
        data={mockData}
        selectedItems={[]}
        onItemSelect={mockOnItemSelect}
      />,
    );

    expect(screen.getByTestId('bottom-sheet')).toBeTruthy();
    expect(screen.getByTestId('bottom-sheet-flatlist')).toBeTruthy();
    expect(screen.getByText('Option 1')).toBeTruthy();
    expect(screen.getByText('Option 2')).toBeTruthy();
  });

  it('Should calls onItemSelect when an item is pressed', () => {
    const ref = createRef<BottomSheetMethods>();

    render(
      <MultipleSelectSheet
        sheetRef={ref}
        data={mockData}
        selectedItems={[]}
        onItemSelect={mockOnItemSelect}
      />,
    );

    fireEvent.press(screen.getByTestId('option-opt1'));
    expect(mockOnItemSelect).toHaveBeenCalledWith('opt1');
  });
});
