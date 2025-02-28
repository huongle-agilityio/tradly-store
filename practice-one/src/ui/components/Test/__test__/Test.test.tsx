import { render, screen } from '@testing-library/react-native';
import HomeScreen from '..';

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    render(<HomeScreen />);

    screen.getByText('Welcome!');
  });
});
