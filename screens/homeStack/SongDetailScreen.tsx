import React from 'react'
import { Image, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Text } from '@components/theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const IMAGE_SIZE = 200;
const SongDetailScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { params: { song } } = useRoute();


  return (
    <BlurView
      intensity={100}
      tint='dark'
      style={[StyleSheet.absoluteFillObject, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
      <Image source={{ uri: song.imageUri }} style={styles.cover} />
      <Text variant='header' textAlign='center' marginTop='m' paddingHorizontal='m' numberOfLines={1}>{song.title}</Text>
      <Text variant='body' textAlign='center' paddingHorizontal='m' numberOfLines={1}>{song.artist}</Text>

      <Box flex={1}>

      </Box>
      <Box padding='s' >
        <TouchableWithoutFeedback onPress={navigation.goBack}>
          <Text variant='itemTitle' textAlign='center'>Close</Text>
        </TouchableWithoutFeedback>
      </Box>
    </BlurView>
  )
}

export default SongDetailScreen

const styles = StyleSheet.create({
  cover: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    alignSelf: 'center'
  }
})
