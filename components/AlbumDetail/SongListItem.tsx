import React, { useCallback } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Song } from 'types';
import { Box, Text } from '@components/theme';
import { Entypo as Icon } from '@expo/vector-icons';
import { RoundedIconButton } from '@components/common';
import { useNavigation } from '@react-navigation/native';
import { usePlayerWidget } from '@components/PlayerWidget';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTransition } from 'react-native-redash';
import Animated from 'react-native-reanimated';

const AText = Animated.createAnimatedComponent(Text);
export type SongListItemProps = {
  song: Song
}

const SongListItem = ({ song }: SongListItemProps) => {
  const navigation = useNavigation();
  const { selectSong, selectedSong } = usePlayerWidget();
  const isSelected = useTransition(song === selectedSong, { duration: 100 });

  const onMore = useCallback(() => {
    navigation.navigate('SongDetail', { song })
  }, [navigation, song]);

  const onPress = useCallback(() => {
    selectSong && selectSong(song);
  }, [selectSong, song]);

  return (
    <BorderlessButton onPress={onPress}>
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
          <AText
            variant='itemTitle'
            numberOfLines={1}
            color='brandPrimary'
            style={{ position: 'absolute', opacity: isSelected }}
          >{song.title}</AText>
          <Text
            variant='itemSubTitle'
            numberOfLines={1}
          >
            {song.artist}
          </Text>
        </Box>
        <RoundedIconButton
          onPress={onMore}
          color='textColor'
          size={30}
          name='dots-three-horizontal'
        />
      </Box >
    </BorderlessButton>
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
