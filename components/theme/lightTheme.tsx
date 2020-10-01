import { createBox, createText, createTheme } from '@shopify/restyle'

export const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',

  grey: '#F3F7F0'
};


const theme = createTheme({
  colors: {
    brandPrimary: palette.greenPrimary,
    transparent: 'transparent',
    black: palette.black,
    white: palette.white,
    mainBackground: palette.white,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.purplePrimary,
    buttonPrimaryBackground: palette.purplePrimary,
    grey: palette.grey,
    grey30: 'rgba(255,255,255,0.2)',
    textColor: palette.white
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    none: 0,
    xxs: 2,
    xs: 4,
    s: 8,
    m: 12,
    l: 20,
    xl: 30,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'textColor',
    },
    subheader: {
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'textColor',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'textColor',
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      color: 'textColor',
    },
    itemSubTitle: {
      fontSize: 12,
      lineHeight: 16,
      color: 'textColor',
    }
  },
});

export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export default theme;