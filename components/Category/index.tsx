import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Album } from '../../types';
import AlbumComp from '../Album';

export type CategoryProps = {
  id: string;
  title: string;
  albums: Album[];
};

const Category = ({ title, albums }: CategoryProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={albums}
        renderItem={({ item }) => <AlbumComp album={item} />}
      />
    </View>
  )
}

export default Category;

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 10
  }
})
