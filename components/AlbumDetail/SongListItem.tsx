import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Song } from 'types';
import { Box, Text } from '@components/theme';
import { Entypo as Icon } from '@expo/vector-icons';

export type SongListItemProps = {
  song: Song
}

const SongListItem = ({ song }: SongListItemProps) => {
  return (
    <Box
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
      paddingHorizontal='s'
      marginVertical='m'
    >
      <Box>
        <Image
          source={{ uri: song.imageUri }}
          style={styles.image} />
      </Box>
      <Box
        flex={1}
        marginHorizontal='s'
      >
        <Text
          variant='itemTitle'
          numberOfLines={1}
        >
          {song.title}
        </Text>
        <Text
          variant='itemSubTitle'
          numberOfLines={1}
        >
          {song.artist}
        </Text>
      </Box>
      <Box>
        <Icon
          name='dots-three-horizontal'
          size={30}
        />
      </Box>
    </Box >
  )
}

export default SongListItem

const IMG_SIZE = 50;
const styles = StyleSheet.create({
  image: {
    width: IMG_SIZE,
    height: IMG_SIZE,
    borderRadius: 5
  },
})
