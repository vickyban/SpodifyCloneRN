import { useNavigation } from '@react-navigation/native';
import { Box, Text } from '@components/theme';
import React, { useCallback } from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'
import { Album } from 'types';

export type AlbumProps = {
  album: Album;
  width: number;
};

const AlbumComp = ({ album, width }: AlbumProps) => {
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    navigation.navigate('AlbumDetail', { album });
  }, [album])

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Box style={styles.container} marginHorizontal='s' marginBottom='l' marginTop='m' backgroundColor='black'>
        <Image source={{ uri: album.imageUri }} style={{
          width: width,
          height: width
        }} />
        <Text
          variant='itemTitle'
          textAlign='center'
          marginTop='s'
        >{album.artistsHeadline}</Text>
      </Box>
    </TouchableWithoutFeedback>
  )
}

export default AlbumComp;

const ALBUM_WIDTH = 155;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: ALBUM_WIDTH,
  },
  text: {
    color: 'grey',
    marginTop: 10,
  }
})
