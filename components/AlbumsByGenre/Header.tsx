import { Text, Box } from '@components/theme';
import { useNavigation } from '@react-navigation/native';
import { RoundedIconButton } from '@components/common';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';

const AText = Animated.createAnimatedComponent(Text);
export const HEADER_HEIGHT = 40;

type HeaderProps = {
  title: string;
  y: Animated.Value<number>;
}
const Header = ({ title, y }: HeaderProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const translateY = interpolate(y, {
    inputRange: [HEADER_HEIGHT / 2, HEADER_HEIGHT],
    outputRange: [20, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const opacity = interpolate(y, {
    inputRange: [HEADER_HEIGHT - 10, HEADER_HEIGHT + 10],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <View style={{ paddingTop: insets.top }}>
      <Box
        height={HEADER_HEIGHT}
        width='100%'
        flexDirection='row'
        alignItems='center'
        paddingHorizontal='m'
      >
        <RoundedIconButton
          name='chevron-left'
          color='white'
          size={30}
          onPress={navigation.goBack}
        />
        <Box flex={1} marginHorizontal='m' overflow='hidden'>
          <AText
            variant='itemTitle'
            fontWeight='bold'
            textAlign='center'
            style={{
              opacity,
              transform: [{ translateY }]
            }}
          >
            {title}
          </AText>
        </Box>
        <RoundedIconButton
          name='chevron-left'
          color='transparent'
          size={30}
          onPress={() => { }}
        />
      </Box>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})
