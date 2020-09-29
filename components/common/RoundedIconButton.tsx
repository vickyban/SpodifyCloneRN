import React, { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import RoundedIcon from './RoundIcon';

type RoundedIconButtonProps = ComponentProps<typeof RoundedIcon> & {
  onPress: () => void
}

const RoundedIconButton = ({ onPress, ...props }: RoundedIconButtonProps) => {
  return (
    <RectButton onPress={onPress}>
      <RoundedIcon {...props} />
    </RectButton>
  )
}

export default RoundedIconButton

const styles = StyleSheet.create({})
