import { Box, Text } from '@components/theme';
import React, { useCallback } from 'react'
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SEARCH_BAR_HEIGHT } from './SearchBar';
import { COVER_ACTUAL_HEIGHT } from './AlbumCover';
import { useNavigation } from '@react-navigation/native';

const AText = Animated.createAnimatedComponent(Text);
export const HEADER_HEIGHT = 50;

export type HeaderProps = {
  title: string;
  y: Animated.Value
}
const Header = ({ title, y }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const bgOpacity = y.interpolate({
    inputRange: [HEADER_HEIGHT + insets.top + SEARCH_BAR_HEIGHT + COVER_ACTUAL_HEIGHT / 2, HEADER_HEIGHT + insets.top + SEARCH_BAR_HEIGHT + COVER_ACTUAL_HEIGHT],
    outputRange: [0, 1]
  });

  const textOpacity = y.interpolate({
    inputRange: [HEADER_HEIGHT + insets.top + SEARCH_BAR_HEIGHT + COVER_ACTUAL_HEIGHT / 2, HEADER_HEIGHT + insets.top + SEARCH_BAR_HEIGHT + COVER_ACTUAL_HEIGHT],
    outputRange: [0, 1]
  });

  const textTranslateY = y.interpolate({
    inputRange: [HEADER_HEIGHT + insets.top + SEARCH_BAR_HEIGHT + COVER_ACTUAL_HEIGHT / 2, HEADER_HEIGHT + insets.top + SEARCH_BAR_HEIGHT + COVER_ACTUAL_HEIGHT],
    outputRange: [10, 0]
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
        <TouchableOpacity onPress={goBack}>
          <Text variant="header">
            <Icon name='chevron-left' size={24} />
          </Text>
        </TouchableOpacity>
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
