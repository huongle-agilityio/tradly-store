const greenPallet = {
  green1: '#33907c',
  green2: '#13b58c',
  green3: '#277350',
} as const;

const redPallet = {
  red1: '#901F2E',
  red2: '#ff5880',
  red3: '#E4ABB1',
} as const;

const whitePallet = {
  white1: '#fff',
  whiteBlue1: '#f6f9ff',
} as const;

const greyPallet = {
  grey1: '#4f4f4f',
  grey2: '#4a4a4a',
  grey3: '#dbdbde',
  greyTranslucent: 'rgba(8, 11, 18, 0.4)',
} as const;

const blackPallet = {
  black1: '#000',
  black2: '#212121',
  black3: '#333A42',
} as const;

const baseColors = {
  ...greenPallet,
  ...redPallet,
  ...whitePallet,
  ...greyPallet,
  ...blackPallet,
} as const;

export const colors = {
  transparent: 'transparent',
  primary: baseColors.green1,
  secondary: baseColors.grey1,
  tertiary: baseColors.whiteBlue1,
  light: baseColors.white1,
  placeholder: baseColors.grey1,
  error: baseColors.red2,
  success: baseColors.green2,
  text: {
    default: baseColors.black1,
    light: baseColors.white1,
    primary: baseColors.green2,
    secondary: baseColors.green1,
    tertiary: baseColors.grey2,
    quaternary: baseColors.black2,
    placeholder: baseColors.grey1,
    error: baseColors.red1,
    success: baseColors.green3,
  },
  button: {
    backgroundPrimary: baseColors.green1,
    backgroundSecondary: baseColors.white1,
    success: baseColors.green3,
    error: baseColors.red1,
    textPrimary: baseColors.green2,
    textSecondary: baseColors.white1,
  },
  input: {
    backgroundPrimary: baseColors.white1,
    borderPrimary: baseColors.white1,
    borderSecondary: baseColors.grey3,
    textPrimary: baseColors.white1,
    textSecondary: baseColors.grey1,
    textTertiary: baseColors.black3,
    textQuaternary: baseColors.black2,
  },
  select: {
    backgroundPrimary: baseColors.white1,
    textPrimary: baseColors.grey1,
  },
  productCard: {
    background: baseColors.white1,
    border: baseColors.grey3,
    textSecondary: baseColors.grey1,
    textPrimary: baseColors.grey2,
    textTertiary: baseColors.green1,
  },
  storeCard: {
    background: baseColors.white1,
    text: baseColors.grey2,
  },
  categoryCard: {
    background: baseColors.greyTranslucent,
    text: baseColors.white1,
  },
  tabItem: {
    textPrimary: baseColors.green1,
    textSecondary: baseColors.grey1,
  },
  cartItem: {
    background: baseColors.white1,
    textPrimary: baseColors.green1,
    textSecondary: baseColors.grey1,
  },
} as const;
