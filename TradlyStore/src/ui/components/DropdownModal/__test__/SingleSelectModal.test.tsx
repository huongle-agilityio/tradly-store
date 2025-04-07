import { render, fireEvent, screen } from '@testing-library/react-native';

// Components
import { SingleSelectModal } from '../SingleSelectModal';

// Mocks
import { ADDITIONAL_DETAILS } from '@/mocks';

describe('SingleSelectModal', () => {
  const selectedItem = ADDITIONAL_DETAILS[0].value;
  const onItemSelect = jest.fn();
  const handleCloseModal = jest.fn();

  const setup = () =>
    render(
      <SingleSelectModal
        isModalVisible
        data={ADDITIONAL_DETAILS}
        selectedItem={selectedItem}
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

    fireEvent.press(optionItems[1]);

    expect(onItemSelect).toHaveBeenCalledWith(ADDITIONAL_DETAILS[1].value);
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it('Should calls handleCloseModal when backdrop is pressed', () => {
    setup();

    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.press(backdrop);

    expect(handleCloseModal).toHaveBeenCalled();
  });
});
