import TabBar, { TAB_BAR_HEIGHT } from './TabBar';
import React, { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import PlayerWidget from '@components/PlayerWidget';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useValue } from 'react-native-redash';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';

const TabBarWithPlayer = (props: BottomTabBarProps) => {
  const widgetTranslateY = useValue(0);

  const translateY = interpolate(widgetTranslateY, {
    inputRange: [0, TAB_BAR_HEIGHT],
    outputRange: [0, TAB_BAR_HEIGHT],
    extrapolate: Extrapolate.CLAMP
  })
  return (
    <>
      <PlayerWidget tabbarHeight={TAB_BAR_HEIGHT} widgetTranslateY={widgetTranslateY} />
      <Animated.View style={{ transform: [{ translateY }] }}>
        <TabBar {...props} />
      </Animated.View>
    </>
  )
}

export default TabBarWithPlayer

const styles = StyleSheet.create({})

