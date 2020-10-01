import lightTheme, { Theme, palette } from './lightTheme';

const { colors, ...rest } = lightTheme;
const darkTheme: Theme = {
  colors: {
    ...colors,
    textColor: palette.white
  },
  ...rest
}

export default darkTheme;