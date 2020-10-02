import React from 'react'
import { StyleSheet, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { Box } from '@components/theme';
import { HEADER_HEIGHT } from './Header';

const { height } = Dimensions.get('window');
export const GRADIENT_BG_HEIGHT = height * 0.2;

type BackgroundCoverProps = {
  backgroundColor: string;
  y: Animated.Value<number>;
}

const BackgroundCover = ({ backgroundColor, y }: BackgroundCoverProps) => {

  const translateY = interpolate(y, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 0],
    extrapolateRight: Extrapolate.CLAMP
  })

  return (
    <Box backgroundColor={backgroundColor} style={StyleSheet.absoluteFillObject}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { transform: [{ translateY }] }]}>
        <LinearGradient
          start={[0, 0]}
          end={[0, 0.2]}
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
    </Box>
  )
}

export default BackgroundCover

const styles = StyleSheet.create({
})
