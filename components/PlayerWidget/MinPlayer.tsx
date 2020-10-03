import { Box, Text } from '@components/theme'
import React from 'react'
import { StyleSheet, Image } from 'react-native'
import usePlayerWidget from './hook';
import PlayButton from './PlayButton';

export const MINI_PLAYER_HEIGHT = 90;
const MinPlayer = () => {
  const { selectedSong, isPlaying, togglePlay } = usePlayerWidget();

  if (selectedSong === null) return null;
  return (
    <Box
      flexDirection='row'
      alignItems='center'
      height={MINI_PLAYER_HEIGHT}
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
  )
}

export default MinPlayer

const styles = StyleSheet.create({
  cover: {
    width: MINI_PLAYER_HEIGHT,
    height: MINI_PLAYER_HEIGHT
  }
})
