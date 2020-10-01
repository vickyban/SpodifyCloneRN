import { Box, Text, Theme } from '@components/theme';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import React, { ComponentProps } from 'react'
import { StyleSheet, View } from 'react-native';
import * as Icons from '@expo/vector-icons';

type RoundIconProps = {
  IconType?: Icon<string, string>;
  name: string;
  size: number;
  iconRatio?: number;
  color: keyof Theme['colors'];
  backgroundColor?: keyof Theme['colors'];
  containerStyle?: ComponentProps<typeof Box>
}

const RoundIcon = ({
  IconType = Icons.Entypo,
  name,
  size,
  iconRatio = 0.8,
  color,
  backgroundColor = 'transparent',
  containerStyle }: RoundIconProps) => {
  const iconSize = size * iconRatio;
  return (
    <Box
      height={size}
      width={size}
      justifyContent='center'
      alignItems='center'
      backgroundColor={backgroundColor}
      style={{
        borderRadius: size / 2
      }}
      {...containerStyle}
    >
      <Text
        style={{
          width: iconSize,
          height: iconSize
        }}
        color={color}>
        <IconType name={name} size={iconSize} style={{ textAlign: 'center' }} />
      </Text>
    </Box>
  )
}

export default RoundIcon;

const styles = StyleSheet.create({})
