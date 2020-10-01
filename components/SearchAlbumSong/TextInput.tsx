import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, View, TextInput as RNTextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Theme } from '@components/theme';
import { RoundedIcon, RoundedIconButton } from '@components/common';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { useValue } from 'react-native-redash';
import Animated from 'react-native-reanimated';

const ABox = Animated.createAnimatedComponent(Box);

export const SEARCH_BAR_HEIGHT = 60;

const TextInput = () => {
  const input = useRef(null);
  const insets = useSafeAreaInsets();
  const theme = useTheme<Theme>();
  const filledText = useValue<number>(0);

  const onChangeText = useCallback((text) => {
    if (text === '') {
      filledText.setValue(0);
    } else if (text !== '') {
      filledText.setValue(1);
    }
  }, [filledText])

  const onClearText = useCallback(() => {
    filledText.setValue(0);
    input.current?.clear();
  }, [input])

  useEffect(() => {
    input.current?.focus();
  }, [input])

  return (
    <Box
      flex={1}
      height='100%'
      flexDirection='row'
      alignItems='center'
      backgroundColor='grey30'
      borderRadius='m'
    >
      <RoundedIcon
        name='magnifying-glass'
        size={24}
        color='white'
        containerStyle={{ margin: 'xs' }}
      />
      <RNTextInput
        ref={input}
        onChangeText={onChangeText}
        style={[styles.textInput, {
          fontSize: 16,
          color: theme.colors.textColor
        }]}
        selectionColor={theme.colors.brandPrimary}
      />
      <ABox margin='xs' style={{ opacity: filledText }}>
        <RoundedIconButton
          onPress={onClearText}
          IconType={Feather}
          name='x'
          size={20}
          color='black'
          backgroundColor='grey'
        />
      </ABox>
    </Box>
  )
}

export default TextInput

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: '100%',
  }
})
