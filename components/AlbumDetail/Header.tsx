import { Box, Text } from '@components/theme';
import React, { useCallback } from 'react'
import { StyleSheet, View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SEARCH_BAR_HEIGHT } from './SearchBar';
import { COVER_ACTUAL_HEIGHT as COVER_HEIGHT } from './AlbumCover';
import { useNavigation } from '@react-navigation/native';
import { RoundedIconButton } from '@components/common';

const AText = Animated.createAnimatedComponent(Text);
export const HEADER_HEIGHT = 50;

export type HeaderProps = {
  title: string;
  y: Animated.Value
}
const Header = ({ title, y }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const searchBarHeight = HEADER_HEIGHT + insets.top + SEARCH_BAR_HEIGHT;

  const bgOpacity = y.interpolate({
    inputRange: [searchBarHeight + COVER_HEIGHT / 2, searchBarHeight + COVER_HEIGHT],
    outputRange: [0, 1]
  });

  const textOpacity = y.interpolate({
    inputRange: [searchBarHeight + COVER_HEIGHT / 2, searchBarHeight + COVER_HEIGHT],
    outputRange: [0, 1]
  });

  const textTranslateY = y.interpolate({
    inputRange: [searchBarHeight + COVER_HEIGHT / 2, searchBarHeight + COVER_HEIGHT],
    outputRange: [10, 0],
    extrapolateRight: 'clamp'
  });

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [])
  return (
    <Box
      position='absolute'
      left={0}
      right={0}
      paddingHorizontal='m'
      style={{
        paddingTop: insets.top
      }}>
      <Animated.View style={[StyleSheet.absoluteFillObject, {
        backgroundColor: 'rgb(169,63,85)',
        opacity: bgOpacity
      }]} />
      <Box style={styles.container}>
        <RoundedIconButton
          name='chevron-left'
          color='white'
          size={30}
          onPress={goBack}
        />
        <Box flex={1} marginHorizontal='m'>
          <AText
            variant='itemTitle'
            numberOfLines={1}
            textAlign='center'
            style={{
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }]
            }}
          >{title}</AText>
        </Box>
      </Box>
    </Box>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: HEADER_HEIGHT,
    overflow: 'hidden'
  }
})
