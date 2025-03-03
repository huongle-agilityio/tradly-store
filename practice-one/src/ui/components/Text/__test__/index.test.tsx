import { render, screen } from '@testing-library/react-native';

// Components
import Text from '..';

// Themes
import { colors, fontSizes, fontWeights } from '@/ui/themes';

describe('Text Component', () => {
  it('Should renders children correctly', () => {
    const container = render(<Text>Hello World</Text>).toJSON();

    expect(screen.getByText('Hello World')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('Should applies the correct default styles', () => {
    render(<Text>Hello World</Text>);
    const textElement = screen.getByText('Hello World');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        { fontSize: fontSizes.base },
        { fontWeight: fontWeights.normal },
        { color: colors.text.default },
        undefined,
      ]),
    );
  });

  it('Should applies the correct color, fontSize, and fontWeight', () => {
    render(
      <Text color="primary" fontSize="xl" fontWeight="bold">
        Styled Text
      </Text>,
    );
    const textElement = screen.getByText('Styled Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        { fontSize: fontSizes.xl },
        { fontWeight: fontWeights.bold },
      ]),
    );
  });

  it('Should merges custom styles with default styles', () => {
    const customStyle = { textAlign: 'center' } as const;
    render(<Text textStyle={customStyle}>Custom Style</Text>);
    const textElement = screen.getByText('Custom Style');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([{ textAlign: 'center' }]),
    );
  });
});
