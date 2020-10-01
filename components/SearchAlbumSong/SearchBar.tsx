import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Text } from '@components/theme';
import Animated from 'react-native-reanimated';
import TextInput from './TextInput';
import { useNavigation } from '@react-navigation/native';

const ABox = Animated.createAnimatedComponent(Box);

export const SEARCH_BAR_HEIGHT = 60;

const SearchBar = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={100}
      tint='dark'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: insets.top
      }}>
      <Box
        flex={1}
        flexDirection='row'
        alignItems='center'
        height={SEARCH_BAR_HEIGHT}
        paddingHorizontal='m'
        paddingVertical='s'
      >
        <TextInput />
        <Box padding='s'>
          <TouchableWithoutFeedback onPress={navigation.goBack}>
            <Text variant='itemTitle'>Cancel</Text>
          </TouchableWithoutFeedback>
        </Box>
      </Box>
    </BlurView>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  textInput: {
    flex: 1,
    height: '100%',
  }
})
