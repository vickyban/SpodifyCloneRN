import React from 'react'
import { StyleSheet, View, Dimensions, Image, Animated } from 'react-native'
import { SEARCH_BAR_HEIGHT } from './SearchBar';

const { width, height } = Dimensions.get('window');
export const COVER_WIDTH = width * 0.5;
const COVER_HEIGHT = COVER_WIDTH;
const SPACING = 20;
export const COVER_ACTUAL_HEIGHT = COVER_HEIGHT + SPACING;
const COVER_HALF_HEIGHT = COVER_HEIGHT / 2;

export type AlbumCoverProps = {
  imageUri: string;
  y: Animated.Value;
  headerHeight: number;
}

const AlbumCover = ({ imageUri, y, headerHeight }: AlbumCoverProps) => {

  const translateY = y.interpolate({
    inputRange: [0, SEARCH_BAR_HEIGHT + headerHeight],
    outputRange: [SEARCH_BAR_HEIGHT + headerHeight, SEARCH_BAR_HEIGHT],
    extrapolateRight: 'clamp'
  })

  const scale = y.interpolate({
    inputRange: [-COVER_HALF_HEIGHT, 0, SEARCH_BAR_HEIGHT + headerHeight, SEARCH_BAR_HEIGHT + headerHeight + COVER_HALF_HEIGHT],
    outputRange: [1.1, 1, 1, 0.8],
  });

  const opacity = y.interpolate({
    inputRange: [SEARCH_BAR_HEIGHT + headerHeight, SEARCH_BAR_HEIGHT + headerHeight + COVER_HALF_HEIGHT],
    outputRange: [1, 0],
  });
  return (
    <Animated.View style={[
      styles.container, {
        opacity,
        transform: [{ translateY },
        { scale }
        ]
      }]}>
      <Animated.Image source={{ uri: imageUri }} style={[styles.img]} resizeMode='cover' />
    </Animated.View>
  )
}

export default AlbumCover

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'red',
    marginTop: SPACING,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  img: {
    width: COVER_WIDTH,
    height: COVER_HEIGHT,
  }
})
