import { render, fireEvent, screen } from '@testing-library/react-native';

// Components
import { Dropdown } from '..';

// Mocks
import { ADDITIONAL_DETAILS } from '@/mocks';

describe('Dropdown', () => {
  const props = {
    placeholder: 'Please select',
    options: ADDITIONAL_DETAILS,
    onChange: jest.fn(),
  };

  it('Should render label if provided', () => {
    render(<Dropdown label="Select Option" {...props} />);

    expect(screen.getByText('Select Option')).toBeTruthy();
  });

  it('Should render placeholder when no value is selected', () => {
    render(<Dropdown {...props} />);

    expect(screen.getByText('Please select')).toBeTruthy();
  });

  it('Should render selected value', () => {
    render(<Dropdown value={ADDITIONAL_DETAILS[1].value} {...props} />);

    expect(screen.getByText(ADDITIONAL_DETAILS[1].label)).toBeTruthy();
  });

  it('Should open modal when dropdown is pressed', () => {
    render(<Dropdown {...props} />);

    fireEvent.press(screen.getByText('Please select'));

    expect(screen.getByTestId('single-select-modal')).toBeTruthy();
  });

  it('Should call onChange when selecting an item', () => {
    const onChange = jest.fn();
    render(<Dropdown {...props} onChange={onChange} />);

    fireEvent.press(screen.getByText('Please select'));
    fireEvent.press(screen.getByText(ADDITIONAL_DETAILS[1].label));

    expect(onChange).toHaveBeenCalledWith(ADDITIONAL_DETAILS[1].value);
  });

  it('Should render error message if error is provided', () => {
    render(<Dropdown error="This field is required" {...props} />);

    expect(screen.getByText('This field is required')).toBeTruthy();
  });

  it('Should not open modal when disabled', () => {
    render(<Dropdown disabled {...props} />);

    fireEvent.press(screen.getByTestId('single-select-modal'));

    expect(screen.queryByTestId('modal-backdrop')).toBeNull();
  });
});
