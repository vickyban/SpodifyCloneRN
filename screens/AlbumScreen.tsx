import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import albumDetail from '../data/albumDetails';

import { AlbumDetail } from '../types';
import AlbumCover, { COVER_ACTUAL_HEIGHT as COVER_HEIGHT } from '@components/AlbumDetail/AlbumCover';
import SongListItem from '@components/AlbumDetail/SongListItem';
import GradientBackground from '@components/AlbumDetail/GradientBackground';
import SearchBar, { SEARCH_BAR_HEIGHT } from '@components/AlbumDetail/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListHeader from '@components/AlbumDetail/ListHeader';
import Header, { HEADER_HEIGHT } from '@components/AlbumDetail/Header';

const AFlatList = Animated.createAnimatedComponent(FlatList);

export default function AlbumScreen() {
  const { params: { album: albumPreview } } = useRoute();
  const [album, setAlbum] = useState<AlbumDetail | null>(albumDetail);
  const insets = useSafeAreaInsets();
  const headerHeight = HEADER_HEIGHT + insets.top;
  const scroll = useRef(null);
  const y = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event([{
    nativeEvent: { contentOffset: { y } }
  }], { useNativeDriver: true })

  useEffect(() => {
    // setAlbum(albumDetail);
  }, []);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollToOffset({ offset: headerHeight + SEARCH_BAR_HEIGHT, animated: false })
    }
  }, [scroll, headerHeight])

  return (
    <View style={styles.container}>
      <GradientBackground y={y} />
      <AlbumCover imageUri={albumPreview.imageUri} y={y} headerHeight={headerHeight} />
      <AFlatList
        ref={scroll}
        scrollEventThrottle={16}
        onScroll={onScroll}
        snapToStart={false}
        snapToOffsets={[0, headerHeight + SEARCH_BAR_HEIGHT]}
        data={album?.songs}
        renderItem={({ item }) => <SongListItem song={item} />}
        ListHeaderComponent={(
          <View
            style={{
              marginTop: 2 * SEARCH_BAR_HEIGHT + headerHeight + COVER_HEIGHT
            }}>
            <ListHeader />
          </View>
        )}
      />
      <SearchBar y={y} headerHeight={headerHeight} />
      <Header title={albumPreview.artistsHeadline} y={y} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
