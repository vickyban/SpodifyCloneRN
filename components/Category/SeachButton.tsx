import { Text, Box } from '@components/theme';
import { RoundedIcon } from '@components/common';
import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { Extrapolate, interpolate, add } from 'react-native-reanimated';
import { BoxProps } from '@shopify/restyle';
import { useNavigation } from '@react-navigation/native';

const ABox = Animated.createAnimatedComponent(Box);
const AText = Animated.createAnimatedComponent(Text);
export const HEADER_HEIGHT = 100;

type SearchButtonProps = {
  y: Animated.Value<number>
}

const SearchButton = ({ y }: SearchButtonProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const translateY = interpolate(y, {
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolateRight: Extrapolate.CLAMP
  })
  const opacity = interpolate(y, {
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <ABox
      position='absolute'
      backgroundColor='black'
      style={{
        width: '100%',
        paddingTop: insets.top,
        transform: [{ translateY }]
      }}>
      <Box width='100%' height={HEADER_HEIGHT} paddingHorizontal='m' paddingVertical='s'>
        <AText variant='header' style={{ opacity }}>Search</AText>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
          <Box
            flex={1}
            flexDirection='row'
            alignItems='center'
            backgroundColor='white'
            paddingHorizontal='m'
            marginRight='s'
            borderRadius='s'
          >
            <RoundedIcon
              name='magnifying-glass'
              size={30}
              color='black'
            />
            <Text variant='body' marginLeft='s' color='black'>
              Artists, songs, or podcasts
          </Text>
          </Box>
        </TouchableWithoutFeedback>
      </Box>
    </ABox>
  )
}

export default SearchButton;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
