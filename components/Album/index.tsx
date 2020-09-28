import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { Album as AlbumType } from '../../types';

export type AlbumProps = {
  album: AlbumType;
};

const Album = ({ album }: AlbumProps) => {
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    navigation.navigate('AlbumDetail', { album });
  }, [album])

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: album.imageUri }} style={styles.image} />
        <Text style={styles.text}>{album.artistsHeadline}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Album;

const ALBUM_WIDTH = 155;
const styles = StyleSheet.create({
  container: {
    width: ALBUM_WIDTH,
    margin: 10
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
