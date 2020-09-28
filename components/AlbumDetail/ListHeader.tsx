import { Box, Text } from '@components/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

export type ListHeaderProps = {
  isSingle?: boolean
}

const ListHeader = ({ isSingle }: ListHeaderProps) => {
  return (
    <Box paddingHorizontal='m'>
      <Text variant='header'>Title</Text>
      <Text variant='body'>
        Animations are started by calling start() on your animation. start() takes a completion callback that will be called when the animation is done or when the animation is done because stop() was called on it before it could finish.
            </Text>
      <Box
        flexDirection='row'
      >
        <Text variant='header' marginRight='m'>
          <MaterialIcons name='favorite-border' size={24} />
        </Text>
        <Text variant='header'>
          <Entypo name='dots-three-horizontal' size={24} />
        </Text>
      </Box>
    </Box>
  )
}

export default ListHeader

const styles = StyleSheet.create({})
