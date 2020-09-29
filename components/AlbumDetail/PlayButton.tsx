import { RounedIconButton } from '@components/common'
import { Box } from '@components/theme'
import React from 'react'
import { Animated, StyleSheet } from 'react-native'


const ABox = Animated.createAnimatedComponent(Box);

type PlayButtonProps = {
  y: Animated.Value,
  headerHeight: number;
  positionY: number;
}

export const BUTTON_SIZE = 50;
const PlayButton = ({ y, headerHeight, positionY }: PlayButtonProps) => {
  const minY = BUTTON_SIZE / 2 + headerHeight;
  const maxOffset = positionY - minY;


  const translateY = y.interpolate({
    inputRange: [0, maxOffset],
    outputRange: [positionY, minY],
    extrapolateRight: 'clamp'
  })

  return (
    <ABox
      marginRight='m'
      style={{
        position: 'absolute',
        top: -BUTTON_SIZE,
        right: 0,
        transform: [{ translateY }]
      }}>
      <RounedIconButton
        size={BUTTON_SIZE}
        iconRatio={0.6}
        color='white'
        backgroundColor='brandPrimary'
        name='controller-play'
        onPress={() => { }}

      />
    </ABox>
  )
}

export default PlayButton

const styles = StyleSheet.create({})
