import { Box } from '@components/theme'
import React from 'react'
import { Animated, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import WidgetPlayerButton from '@components/PlayerWidget/PlayButton';
import { usePlayerWidget } from '@components/PlayerWidget';


const ABox = Animated.createAnimatedComponent(Box);

type PlayButtonProps = {
  y: Animated.Value,
  headerHeight: number;
  positionY: number;
}

export const BUTTON_SIZE = 50;
const PlayButton = ({ y, headerHeight, positionY }: PlayButtonProps) => {
  const { isPlaying, togglePlay } = usePlayerWidget();
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
      <WidgetPlayerButton
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        playIcon={{
          size: BUTTON_SIZE,
          name: 'play-arrow',
          IconType: MaterialIcons,
          color: 'white',
          backgroundColor: 'brandPrimary'
        }}
        pauseIcon={{
          size: BUTTON_SIZE,
          name: 'pause',
          IconType: MaterialIcons,
          color: 'white',
          backgroundColor: 'brandPrimary'
        }}
      />
    </ABox>
  )
}

export default PlayButton

const styles = StyleSheet.create({})
