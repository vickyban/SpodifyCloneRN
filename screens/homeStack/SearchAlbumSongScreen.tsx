import { Box } from '@components/theme'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SearchBar, { SEARCH_BAR_HEIGHT } from '@components/SearchAlbumSong/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SongListItem from '@components/AlbumDetail/SongListItem';

const SearchAlbumSongScreen = () => {
  const { params: { songs } } = useRoute();
  const insets = useSafeAreaInsets();
  return (
    <Box flex={1}>
      <FlatList
        contentContainerStyle={{
          paddingTop: insets.top + SEARCH_BAR_HEIGHT
        }}
        data={songs ?? []}
        renderItem={({ item }) => <SongListItem song={item} />}
      />
      <SearchBar />
    </Box>
  )
}

export default SearchAlbumSongScreen

const styles = StyleSheet.create({

})
