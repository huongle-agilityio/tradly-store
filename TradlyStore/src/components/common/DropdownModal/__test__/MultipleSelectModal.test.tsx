import { render, fireEvent, screen } from '@testing-library/react-native';

// Components
import { MultipleSelectModal } from '../MultipleSelectModal';

// Mocks
import { ADDITIONAL_DETAILS } from '@/mocks';

describe('MultipleSelectModal', () => {
  const selectedItems = [ADDITIONAL_DETAILS[0].value];

  const onItemSelect = jest.fn();
  const handleCloseModal = jest.fn();

  const setup = () =>
    render(
      <MultipleSelectModal
        isModalVisible
        data={ADDITIONAL_DETAILS}
        selectedItems={selectedItems}
        onItemSelect={onItemSelect}
        handleCloseModal={handleCloseModal}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should renders modal when visible', () => {
    setup();

    expect(screen.getByTestId('modal-backdrop')).toBeTruthy();
  });

  it('Should renders all options', () => {
    setup();

    const options = screen.getAllByTestId('option-item');

    expect(options.length).toBe(ADDITIONAL_DETAILS.length);
  });

  it('Should calls onItemSelect and handleCloseModal when option is pressed', () => {
    setup();

    const optionItems = screen.getAllByTestId('option-item');
    fireEvent.press(optionItems[0]);

    expect(onItemSelect).toHaveBeenCalledWith(ADDITIONAL_DETAILS[0].value);
  });

  it('Should calls handleCloseModal when backdrop is pressed', () => {
    setup();

    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.press(backdrop);

    expect(handleCloseModal).toHaveBeenCalled();
  });
});
