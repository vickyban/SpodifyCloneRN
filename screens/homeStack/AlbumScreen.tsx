import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import albumDetail from '../../data/albumDetails';

import { AlbumDetail } from '../../types';
import AlbumCover, { COVER_ACTUAL_HEIGHT as COVER_HEIGHT } from '@components/AlbumDetail/AlbumCover';
import SongListItem from '@components/AlbumDetail/SongListItem';
import GradientBackground from '@components/AlbumDetail/GradientBackground';
import SearchBar, { SEARCH_BAR_HEIGHT } from '@components/AlbumDetail/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListHeader from '@components/AlbumDetail/ListHeader';
import Header, { HEADER_HEIGHT } from '@components/AlbumDetail/Header';
import PlayButton from '@components/AlbumDetail/PlayButton';

const AFlatList = Animated.createAnimatedComponent(FlatList);

export default function AlbumScreen({ navigation }) {
  const { params: { album: albumPreview } } = useRoute();
  const [album, setAlbum] = useState<AlbumDetail | null>(albumDetail);
  const insets = useSafeAreaInsets();
  const headerHeight = HEADER_HEIGHT + insets.top;
  const searchHeight = headerHeight + SEARCH_BAR_HEIGHT;
  const scroll = useRef(null);
  const y = useRef(new Animated.Value(0)).current;
  const [listHeaderHeight, setListHeaderHeight] = useState(300);
  const onScroll = Animated.event([{
    nativeEvent: { contentOffset: { y } }
  }], { useNativeDriver: true });

  const searchSong = useCallback(() => {
    navigation.navigate('SearchAlbumSong', { songs: album?.songs })
  }, [album])

  useEffect(() => {
    // setAlbum(albumDetail);
  }, []);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollToOffset({ offset: searchHeight, animated: false })
    }
  }, [scroll, headerHeight])

  const onListHeaderLayout = useCallback(({ nativeEvent }) => {
    setListHeaderHeight(nativeEvent.layout.height)
  }, [])
  return (
    <View style={styles.container}>
      <GradientBackground y={y} />
      <AlbumCover imageUri={albumPreview.imageUri} y={y} headerHeight={headerHeight} />
      <AFlatList
        ref={scroll}
        scrollEventThrottle={16}
        onScroll={onScroll}
        snapToStart={false}
        snapToEnd={false}
        snapToOffsets={[0, searchHeight]}
        data={album?.songs}
        renderItem={({ item }) => <SongListItem song={item} />}
        ListHeaderComponent={(
          <View
            style={{
              paddingTop: 2 * SEARCH_BAR_HEIGHT + headerHeight + COVER_HEIGHT
            }}
            onLayout={onListHeaderLayout}
          >
            <ListHeader />
          </View>
        )}
      />
      <SearchBar y={y} headerHeight={headerHeight} onSeachSong={searchSong} />
      <Header title={albumPreview.artistsHeadline} y={y} />
      <PlayButton
        y={y}
        headerHeight={headerHeight}
        positionY={listHeaderHeight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
