import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Box, Text } from '@components/theme';
import { Octicons as Icon } from '@expo/vector-icons';
import { RounedIcon } from '@components/common';

const { height } = Dimensions.get('window');
export const SEARCH_BAR_HEIGHT = 40;

export type SearchProps = {
  y: Animated.Value;
  headerHeight: number;
}

const SearchBar = ({ y, headerHeight }: SearchProps) => {
  const translateY = y.interpolate({
    inputRange: [0, headerHeight + SEARCH_BAR_HEIGHT],
    outputRange: [headerHeight, 0],
    extrapolateLeft: 'clamp'
  });

  const opacity = y.interpolate({
    inputRange: [0, SEARCH_BAR_HEIGHT],
    outputRange: [1, 0],
  });

  return (
    <Animated.View style={{
      position: 'absolute',
      left: 0,
      right: 0,
      opacity,
      transform: [{ translateY }]
    }}>
      <Box
        flexDirection='row'
        alignItems='center'
        marginHorizontal='m'
        height={SEARCH_BAR_HEIGHT}
      >
        <TouchableWithoutFeedback>
          <Box
            flex={1}
            flexDirection='row'
            alignItems='center'
            backgroundColor='grey30'
            paddingHorizontal='m'
            height='100%'
            marginRight='s'
            borderRadius='xs'
          >
            <RounedIcon
              name='magnifying-glass'
              size={24}
              color='white'
            />
            <Text variant='body' fontWeight='bold' marginLeft='s'>
              Find in playlist
          </Text>
          </Box>
        </TouchableWithoutFeedback>

        <TouchableOpacity>
          <Box
            alignItems='center'
            justifyContent='center'
            backgroundColor='grey30'
            paddingHorizontal='m'
            height='100%'
            borderRadius='xs'
          >
            <Text variant='body' fontWeight='bold'>
              Filters
          </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Animated.View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {

  }
})
