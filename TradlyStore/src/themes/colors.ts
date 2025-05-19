const greenPallet = {
  green1: '#33907c',
  green2: '#13b58c',
  green3: '#277350',
  green4: '#14433a',
} as const;

const redPallet = {
  red1: '#901f2e',
  red2: '#ff5880',
  red3: '#e4abb1',
  red4: '#ff7272',
} as const;

const whitePallet = {
  white1: '#fff',
  white2: '#ebf6ff',
  white3: '#e8eaee',
  whiteBlue1: '#f6f9ff',
} as const;

const greyPallet = {
  grey1: '#4f4f4f',
  grey2: '#4a4a4a',
  grey3: '#dbdbde',
  grey4: '#606a7b',
  grey5: '#ebecef',
  grey6: '#d8d8d8',
  grey7: '#363535',
  grey8: '#999797',
  greyTranslucent: 'rgba(8, 11, 18, 0.3)',
  greyOpacity: 'rgba(181, 185, 185, 0.6)',
} as const;

const bluePallet = {
  blue1: '#4ea0ff',
} as const;

const blackPallet = {
  black1: '#000',
  black2: '#212121',
  black3: '#333A42',
  black4: '#1c1c1d',
  black5: '#ffffff1a',
} as const;

const baseColors = {
  ...bluePallet,
  ...greenPallet,
  ...redPallet,
  ...whitePallet,
  ...greyPallet,
  ...blackPallet,
} as const;

export const darkColors = {
  transparent: 'transparent',
  primary: baseColors.black4,
  background: baseColors.grey7,
  backgroundSecondary: baseColors.black5,
  backgroundOpacity: baseColors.greyOpacity,
  secondary: baseColors.grey1,
  tertiary: baseColors.whiteBlue1,
  light: baseColors.white1,
  placeholder: baseColors.grey1,
  error: baseColors.red2,
  success: baseColors.green2,
  opacity: baseColors.greyTranslucent,
  link: baseColors.blue1,
  dotNotification: baseColors.red4,
  border: baseColors.grey5,
  text: {
    default: baseColors.white2,
    light: baseColors.white1,
    primary: baseColors.white2,
    secondary: baseColors.green2,
    tertiary: baseColors.white2,
    quaternary: baseColors.white2,
    placeholder: baseColors.grey8,
    fade: baseColors.grey8,
    link: baseColors.blue1,
    error: baseColors.red2,
    success: baseColors.green3,
  },
  skeleton: {
    backgroundPrimary: baseColors.grey4,
    backgroundSecondary: baseColors.greyTranslucent,
  },
  button: {
    backgroundPrimary: baseColors.greyOpacity,
    backgroundSecondary: baseColors.greyOpacity,
    success: baseColors.green3,
    error: baseColors.red1,
    textPrimary: baseColors.white3,
    textSecondary: baseColors.white3,
    textDark: baseColors.black2,
  },
  toast: {
    default: baseColors.black3,
    success: baseColors.green3,
    error: baseColors.red4,
  },
  input: {
    backgroundPrimary: baseColors.white1,
    borderPrimary: baseColors.white1,
    borderSecondary: baseColors.grey3,
    textPrimary: baseColors.white1,
    textSecondary: baseColors.grey1,
    textTertiary: baseColors.white3,
    textQuaternary: baseColors.black2,
    textPlaceholder: baseColors.white3,
  },
  select: {
    backgroundPrimary: baseColors.white1,
    badge: baseColors.grey6,
    textPrimary: baseColors.grey1,
  },
  productCard: {
    background: baseColors.black5,
    border: baseColors.grey4,
    textSecondary: baseColors.grey1,
    textPrimary: baseColors.grey2,
    textTertiary: baseColors.green4,
  },
  storeCard: {
    background: baseColors.white1,
    text: baseColors.grey2,
  },
  categoryCard: {
    background: baseColors.greyTranslucent,
    border: baseColors.grey3,
    text: baseColors.white1,
  },
  tabs: {
    tabBackground: baseColors.black4,
    tabActiveIColor: baseColors.green2,
    tabBarInactiveTintColor: baseColors.grey6,
  },
  cartItem: {
    background: baseColors.white1,
    textPrimary: baseColors.green4,
    textSecondary: baseColors.grey1,
  },
  toggleTheme: {
    dotBackground: baseColors.white1,
    background: baseColors.grey2,
    backgroundActive: baseColors.grey8,
  },
  bottomSheet: {
    background: baseColors.grey2,
  },
};

export const colors = {
  transparent: 'transparent',
  primary: baseColors.green1,
  background: baseColors.white1,
  backgroundSecondary: baseColors.white1,
  backgroundOpacity: baseColors.greyOpacity,
  secondary: baseColors.grey1,
  tertiary: baseColors.whiteBlue1,
  light: baseColors.white1,
  placeholder: baseColors.grey1,
  error: baseColors.red2,
  success: baseColors.green2,
  opacity: baseColors.greyTranslucent,
  link: baseColors.blue1,
  dotNotification: baseColors.red4,
  border: baseColors.grey5,
  text: {
    default: baseColors.black1,
    light: baseColors.white1,
    primary: baseColors.green2,
    secondary: baseColors.green1,
    tertiary: baseColors.grey2,
    quaternary: baseColors.black2,
    placeholder: baseColors.grey1,
    fade: baseColors.grey4,
    link: baseColors.blue1,
    error: baseColors.red1,
    success: baseColors.green3,
  },
  skeleton: {
    backgroundPrimary: baseColors.grey4,
    backgroundSecondary: baseColors.greyTranslucent,
  },
  button: {
    backgroundPrimary: baseColors.green1,
    backgroundSecondary: baseColors.white1,
    success: baseColors.green3,
    error: baseColors.red1,
    textPrimary: baseColors.green2,
    textSecondary: baseColors.white1,
    textDark: baseColors.black2,
  },
  toast: {
    default: baseColors.black3,
    success: baseColors.green3,
    error: baseColors.red4,
  },
  input: {
    backgroundPrimary: baseColors.white1,
    borderPrimary: baseColors.white1,
    borderSecondary: baseColors.grey3,
    textPrimary: baseColors.white1,
    textSecondary: baseColors.grey1,
    textTertiary: baseColors.black3,
    textQuaternary: baseColors.black2,
    textPlaceholder: baseColors.grey1,
  },
  select: {
    backgroundPrimary: baseColors.white1,
    badge: baseColors.grey6,
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
    border: baseColors.grey3,
    text: baseColors.white1,
  },
  tabs: {
    tabBackground: baseColors.white1,
    tabActiveIColor: baseColors.green1,
    tabBarInactiveTintColor: baseColors.grey1,
  },
  cartItem: {
    background: baseColors.white1,
    textPrimary: baseColors.green1,
    textSecondary: baseColors.grey1,
  },
  toggleTheme: {
    dotBackground: baseColors.white1,
    background: baseColors.grey2,
    backgroundActive: baseColors.grey8,
  },
  bottomSheet: {
    background: baseColors.white1,
  },
};
