import SearchBar, { SEARCH_BAR_HEIGHT } from '@components/Search/SearchBar';
import SongListItem from '@components/AlbumDetail/SongListItem'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Box, Text } from '@components/theme'

const SearchScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[]}
        renderItem={({ item }) => <SongListItem song={item} />}
        contentContainerStyle={{ flexGrow: 1, paddingTop: SEARCH_BAR_HEIGHT }}
        ListEmptyComponent={
          <Box flex={1} justifyContent='center' alignItems='center' paddingHorizontal='xl'>
            <Text variant="subheader">Play what you love</Text>
            <Text variant="body">Search for artists, songs, podcasts, and more.</Text>
          </Box>
        }
      />
      <SearchBar />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})
