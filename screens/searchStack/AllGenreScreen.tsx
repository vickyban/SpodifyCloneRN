import { Text, Box } from '@components/theme';
import { RoundedIcon } from '@components/common';
import React, { useCallback } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, FlatList, SectionList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchButton, { HEADER_HEIGHT } from '@components/Category/SeachButton';
import data from '../../data/categories';
import CategoryListItem from '@components/Category/CategoryListItem';
import Animated from 'react-native-reanimated';
import { useValue } from 'react-native-redash';

const ASectionList = Animated.createAnimatedComponent(SectionList);

const AllGenreScreen = () => {
  const insets = useSafeAreaInsets();
  const headerHeight = insets.top + HEADER_HEIGHT;
  const y = useValue(0);

  const _renderList = useCallback(({ section, index }) => {
    if (index !== 0) return null;
    return (
      <FlatList numColumns={2}
        data={section.data}
        renderItem={({ item }) => <CategoryListItem category={item} />}
      />
    )
  }, [])
  return (
    <View style={styles.container}>
      <ASectionList
        contentContainerStyle={{ paddingTop: headerHeight }}
        scrollEventThrottle={1}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }])}
        sections={data}
        stickyHeaderIndices={[0]}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text variant='itemTitle' fontWeight='bold' marginHorizontal='s' marginVertical='m'>{title}</Text>
        )}
        renderItem={_renderList}
      />
      <SearchButton y={y} />
    </View>
  )
}

export default AllGenreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
