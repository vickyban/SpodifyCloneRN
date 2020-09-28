import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AlbumCategory from '../components/Category';
import { Album as AlbumType } from '../types';
import categoryData from '../data/albumCategories';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={categoryData}
        renderItem={({ item }) => <AlbumCategory {...item} />}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
