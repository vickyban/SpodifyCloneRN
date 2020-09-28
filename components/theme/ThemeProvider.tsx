import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

type ThemeProviderProps = {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();

  return (
    <RestyleThemeProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
      {children}
    </RestyleThemeProvider>
  )
}

export default ThemeProvider

