import { useRoute } from '@react-navigation/native'
import Header from '@components/AlbumsByGenre/Header'
import React, { useCallback } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import BackgroundCover from '@components/AlbumsByGenre/BackgroundCover';
import data from '../../data/albumCategories';
import Album from '@components/AlbumsByGenre/Album';
import { useTheme } from '@shopify/restyle';
import { Text, Theme, Box } from '@components/theme';
import Animated from 'react-native-reanimated';
import { useScrollHandler } from 'react-native-redash';


const { width } = Dimensions.get('window');
const AlbumsByGenreScreen = () => {
  const { params: { genre } } = useRoute();
  const { spacing } = useTheme<Theme>();
  const imgWidth = width / 2 - (spacing.s * 2);
  const { scrollHandler, y } = useScrollHandler()

  const renderScrollComponent = useCallback(props => <Animated.ScrollView {...props} {...scrollHandler} />, [scrollHandler])
  return (
    <View style={styles.container}>
      <BackgroundCover backgroundColor={genre.backgroundColor} y={y} />
      <Header title={genre.name} y={y} />
      <FlatList
        data={data[0].albums}
        numColumns={2}
        ListHeaderComponent={(
          <Box>
            <Text
              variant='subheader'
              marginHorizontal='s'
              marginVertical='m'>
              {genre.name}
            </Text>
            <Text
              variant='itemTitle'
              fontWeight='bold'
              marginHorizontal='s'
            >
              {data[0].title}
            </Text>
          </Box>)}
        renderItem={({ item }) => <Album album={item} width={imgWidth} />}

        renderScrollComponent={renderScrollComponent}
      />
    </View>
  )
}

export default AlbumsByGenreScreen

const styles = StyleSheet.create({
  container: { flex: 1 }
})
