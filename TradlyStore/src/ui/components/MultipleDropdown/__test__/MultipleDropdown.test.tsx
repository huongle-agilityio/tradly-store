import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';

// Components
import { MultipleDropdown } from '..';

// Mocks
import { ADDITIONAL_DETAILS } from '@/mocks';

describe('MultipleDropdown', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('Should renders placeholder when no items are selected', () => {
    render(
      <MultipleDropdown
        label="Label test"
        placeholder="Select something"
        options={ADDITIONAL_DETAILS}
        selectedItems={[]}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByPlaceholderText('Select something')).toBeTruthy();
  });

  it('Should renders selected chips when items are selected', () => {
    render(
      <MultipleDropdown
        label="Label test"
        placeholder="Select something"
        options={ADDITIONAL_DETAILS}
        selectedItems={[
          ADDITIONAL_DETAILS[0].value,
          ADDITIONAL_DETAILS[1].value,
        ]}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText(ADDITIONAL_DETAILS[0].label)).toBeTruthy();
    expect(screen.getByText(ADDITIONAL_DETAILS[1].label)).toBeTruthy();
  });

  it('Should opens modal and selects an item', async () => {
    render(
      <MultipleDropdown
        label="Label test"
        placeholder="Select something"
        options={ADDITIONAL_DETAILS}
        selectedItems={[]}
        onChange={mockOnChange}
      />,
    );
    fireEvent.press(screen.getByPlaceholderText('Select something'));

    await waitFor(() => {
      expect(screen.getByText(ADDITIONAL_DETAILS[0].label)).toBeTruthy();
    });

    await waitFor(() => {
      expect(screen.getByText(ADDITIONAL_DETAILS[1].label)).toBeTruthy();
    });

    fireEvent.press(screen.getByText(ADDITIONAL_DETAILS[0].label));

    expect(mockOnChange).toHaveBeenCalledWith([ADDITIONAL_DETAILS[0].value]);
  });

  it('Should removes a chip when pressing on it', () => {
    render(
      <MultipleDropdown
        label="Label test"
        placeholder="Select something"
        options={ADDITIONAL_DETAILS}
        selectedItems={[ADDITIONAL_DETAILS[0].value]}
        onChange={mockOnChange}
      />,
    );

    fireEvent.press(screen.getByText(ADDITIONAL_DETAILS[0].label));

    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it('Should displays error message if error prop is provided', () => {
    render(
      <MultipleDropdown
        label="Label test"
        placeholder="Select something"
        options={ADDITIONAL_DETAILS}
        selectedItems={[]}
        error="Something went wrong"
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText('Something went wrong')).toBeTruthy();
  });
});
