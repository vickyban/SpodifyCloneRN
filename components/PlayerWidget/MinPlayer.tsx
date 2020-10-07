import { Box, Text } from '@components/theme'
import React from 'react'
import { StyleSheet, Image } from 'react-native'
import usePlayerWidget from './hook';
import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';

export const MINI_PLAYER_HEIGHT = 70;
const PROGESS_BAR_HEIGHT = 5;
const ACTUAL_PLAYER_HEIGHT = MINI_PLAYER_HEIGHT - PROGESS_BAR_HEIGHT;
const MinPlayer = () => {
  const { selectedSong, isPlaying, togglePlay } = usePlayerWidget();

  if (selectedSong === null) return null;
  return (
    <Box width='100%'>
      <ProgressBar tabHeight={PROGESS_BAR_HEIGHT} max={3.20} />
      <Box
        flexDirection='row'
        alignItems='center'
        height={ACTUAL_PLAYER_HEIGHT}
        borderBottomWidth={1}
        borderBottomColor='black'
      >
        <Image source={{ uri: selectedSong.imageUri }} style={styles.cover} />
        <Box padding='s' justifyContent='center' flex={1}>
          <Text variant='itemTitle' fontWeight='bold'>{selectedSong.title}</Text>
          <Text variant='itemTitle'>{selectedSong.artist}</Text>
        </Box>
        <PlayButton isPlaying={isPlaying} togglePlay={togglePlay} />
      </Box>
    </Box>
  )
}

export default MinPlayer

const styles = StyleSheet.create({
  cover: {
    width: ACTUAL_PLAYER_HEIGHT,
    height: ACTUAL_PLAYER_HEIGHT,
  }
})
