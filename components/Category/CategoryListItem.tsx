import { Box, Text } from '@components/theme';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Category } from 'types';

type CategoryListItemProps = {
  category: Category;
};

const IMG_SIZE = 80;

const CategoryListItem = ({ category }: CategoryListItemProps) => {
  const navigation = useNavigation();
  const onPress = useCallback(() => { navigation.navigate('AlbumsByGenre', { genre: category }) }, [category, navigation])
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Box
        flex={1}
        flexDirection='row'
        backgroundColor={category.backgroundColor}
        margin='s'
        borderRadius='xs'
        padding='s'
        overflow='hidden'
      >
        <Box flex={1}>
          <Text variant='itemTitle' fontWeight='bold'>{category.name}</Text>
        </Box>
        <Box style={{
          transform: [
            { translateY: 12 },
            { translateX: IMG_SIZE / 4 },
            { rotateZ: '25deg' }
          ],
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
          <Image source={{ uri: category.imageUri }} style={styles.img} />
        </Box>

      </Box>
    </TouchableWithoutFeedback>
  )
}

export default CategoryListItem

const styles = StyleSheet.create({
  img: {
    width: IMG_SIZE,
    height: IMG_SIZE,
  }
})
