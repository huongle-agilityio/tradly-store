import { render, screen } from '@testing-library/react-native';

// Components
import { Image } from '..';

describe('Image Component', () => {
  const source = 'https://example.com/image.jpg';
  const altText = 'Example image';

  it('Should renders correctly with given source and alt', () => {
    render(<Image source={source} alt={altText} />);
    const image = screen.getByLabelText(altText);

    expect(image).toBeTruthy();
    expect(image.props.source[0]).toEqual({ uri: source });
  });

  it('Should applies custom styles', () => {
    const customStyle = { width: 100, height: 100 };
    render(<Image source={source} alt={altText} styles={customStyle} />);

    const image = screen.getByLabelText(altText);
    expect(image.props.style).toEqual(customStyle);
  });

  it('Should renders placeholder with blurhash', () => {
    render(<Image source={source} alt={altText} />);
    const image = screen.getByLabelText(altText);

    expect(image.props.placeholder).toBeDefined();
  });

  it('Should passes additional props to ExpoImage', () => {
    render(<Image source={source} alt={altText} transition={500} />);

    const image = screen.getByLabelText(altText);
    expect(image.props.transition.duration).toBe(500);
  });
});
