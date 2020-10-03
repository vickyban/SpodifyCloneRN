import { RoundedIcon, RoundedIconButton } from '@components/common'
import { Box } from '@components/theme'
import { MaterialIcons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler';
import Animated, { sub } from 'react-native-reanimated';
import { useTransition } from 'react-native-redash';


const ABox = Animated.createAnimatedComponent(Box);

type PlayButtonProps = {
  isPlaying: boolean;
  togglePlay: () => void;
  playIcon?: ComponentProps<typeof RoundedIcon>;
  pauseIcon?: ComponentProps<typeof RoundedIcon>;
}

export const BUTTON_SIZE = 50;
const PlayButton = ({
  isPlaying,
  togglePlay,
  playIcon = { size: BUTTON_SIZE, name: 'controller-play', color: 'white' },
  pauseIcon = { size: BUTTON_SIZE, IconType: MaterialIcons, name: 'pause', color: 'white' }
}: PlayButtonProps) => {
  const transition = useTransition(isPlaying, { duration: 100 });

  return (
    <BorderlessButton onPress={togglePlay}>
      <ABox style={{ opacity: sub(1, transition) }}>
        <RoundedIcon {...playIcon} />
      </ABox>
      <ABox position='absolute' style={{ opacity: transition }}>
        <RoundedIcon {...pauseIcon} />
      </ABox>
    </BorderlessButton>
  )
}

export default PlayButton

const styles = StyleSheet.create({})
