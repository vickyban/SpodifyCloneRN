import React from 'react'
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');
export const GRADIENT_BG_HEIGHT = height * 0.8;

export type GradientBackgroundProps = {
  y: Animated.Value
}
const GradientBackground = ({ y }: GradientBackgroundProps) => {
  const translateY = y.interpolate({
    inputRange: [0, GRADIENT_BG_HEIGHT],
    outputRange: [0, -GRADIENT_BG_HEIGHT],
    extrapolateLeft: 'clamp'
  });
  return (
    <Animated.View style={[styles.container, {
      transform: [{ translateY }]
    }]}>
      <LinearGradient
        // Background Linear Gradient
        start={[0, 0.7]}
        end={[0, 1]}
        colors={['rgba(169,63,85,0.8)', 'transparent']}
        style={styles.container}
      />
    </Animated.View>
  )
}

export default GradientBackground

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: GRADIENT_BG_HEIGHT,
  }
})
