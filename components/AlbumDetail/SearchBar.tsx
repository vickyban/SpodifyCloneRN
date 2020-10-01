import React, { useCallback, useRef } from 'react'
import { StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Animated, Dimensions, View } from 'react-native';
import { Box, Text } from '@components/theme';
import { RoundedIcon } from '@components/common';
import BottomSheet from 'reanimated-bottom-sheet';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');
export const SEARCH_BAR_HEIGHT = 40;

export type SearchProps = {
  y: Animated.Value;
  headerHeight: number;
  onSeachSong: () => void;
}

const SearchBar = ({ y, headerHeight, onSeachSong }: SearchProps) => {
  const sheetRef = useRef(null);
  const translateY = y.interpolate({
    inputRange: [0, headerHeight + SEARCH_BAR_HEIGHT],
    outputRange: [headerHeight, 0],
    extrapolateLeft: 'clamp'
  });

  const opacity = y.interpolate({
    inputRange: [0, SEARCH_BAR_HEIGHT],
    outputRange: [1, 0],
  });

  const openSheet = useCallback(() => {
    sheetRef.current?.snapTo(0);
  }, [sheetRef])

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );
  return (
    <>
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
          <TouchableWithoutFeedback onPress={onSeachSong}>
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
              <RoundedIcon
                name='magnifying-glass'
                size={24}
                color='white'
              />
              <Text variant='body' fontWeight='bold' marginLeft='s'>
                Find in playlist
          </Text>
            </Box>
          </TouchableWithoutFeedback>

          <TouchableOpacity onPress={openSheet}>
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
      <BottomSheet
        ref={sheetRef}
        initialSnap={1}
        snapPoints={[450, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {

  }
})
