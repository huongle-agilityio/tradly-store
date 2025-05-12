import { memo, PropsWithChildren, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  TextStyle,
  Text as BaseText,
  StyleProp,
  TextProps as BaseTextProps,
  StyleSheet,
} from 'react-native';

// Themes
import {
  fontWeights as baseFontWeights,
  fontSizes as baseFontSizes,
  lineHeights,
  fontsFamily,
} from '@/themes';

// Interfaces
import { TextColor, TextSize, TextWeight } from '@/interfaces';

interface TextProps extends PropsWithChildren<BaseTextProps> {
  color?: TextColor;
  fontSize?: TextSize;
  textStyle?: StyleProp<TextStyle>;
  fontWeight?: TextWeight;
}

export const Text = memo(
  ({
    children,
    color = 'default',
    fontSize = 'base',
    fontWeight = 'normal',
    textStyle,
    ...props
  }: TextProps) => {
    const { colors: baseColors } = useTheme();
    const colors = useMemo(
      () =>
        StyleSheet.create({
          default: { color: baseColors.text.default },
          light: { color: baseColors.text.light },
          primary: { color: baseColors.text.primary },
          secondary: { color: baseColors.text.secondary },
          tertiary: { color: baseColors.text.tertiary },
          quaternary: { color: baseColors.text.quaternary },
          placeholder: { color: baseColors.text.placeholder },
          fade: { color: baseColors.text.fade },
          link: { color: baseColors.text.link },
          error: { color: baseColors.text.error },
          success: { color: baseColors.text.success },
        }),
      [
        baseColors.text.default,
        baseColors.text.error,
        baseColors.text.fade,
        baseColors.text.light,
        baseColors.text.link,
        baseColors.text.placeholder,
        baseColors.text.primary,
        baseColors.text.quaternary,
        baseColors.text.secondary,
        baseColors.text.success,
        baseColors.text.tertiary,
      ],
    );

    return (
      <BaseText
        style={[
          fontSizes[fontSize],
          fontWeights[fontWeight],
          colors[color],
          textStyle && textStyle,
        ]}
        {...props}
      >
        {children}
      </BaseText>
    );
  },
);

const fontSizes = StyleSheet.create({
  xxs: { fontSize: baseFontSizes.xxs, lineHeight: lineHeights.xxs },
  xs: { fontSize: baseFontSizes.xs, lineHeight: lineHeights.xs },
  sm: { fontSize: baseFontSizes.sm, lineHeight: lineHeights.lg },
  base: { fontSize: baseFontSizes.base, lineHeight: lineHeights.base },
  md: { fontSize: baseFontSizes.md, lineHeight: lineHeights.md },
  lg: { fontSize: baseFontSizes.lg, lineHeight: lineHeights.sm },
  xl: { fontSize: baseFontSizes.xl, lineHeight: lineHeights.xxl },
  xxl: { fontSize: baseFontSizes.xxl, lineHeight: lineHeights.xxl },
  xxxl: { fontSize: baseFontSizes.xxxl, lineHeight: lineHeights.xxl },
});

const fontWeights = StyleSheet.create({
  light: { fontFamily: fontsFamily.regular, fontWeight: baseFontWeights.light },
  normal: {
    fontFamily: fontsFamily.medium,
    fontWeight: baseFontWeights.normal,
  },
  medium: { fontFamily: fontsFamily.bold, fontWeight: baseFontWeights.medium },
  bold: { fontFamily: fontsFamily.semiBold, fontWeight: baseFontWeights.bold },
});
