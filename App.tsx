import { StatusBar } from 'expo-status-bar';
import React from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider } from './components/theme';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppearanceProvider>
        <ThemeProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ThemeProvider>
      </AppearanceProvider>
    );
  }
}
