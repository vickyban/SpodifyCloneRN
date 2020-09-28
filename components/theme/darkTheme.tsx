import lightTheme, { Theme } from './lightTheme';

const darkTheme: Theme = {
  ...lightTheme,
  textVariants: Object.entries(lightTheme.textVariants).reduce((acc, [key, value]) => {
    acc[key] = {
      ...value,
      color: 'white'
    };
    return acc;
  }, {})
}

export default darkTheme;