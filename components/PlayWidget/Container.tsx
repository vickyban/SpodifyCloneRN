import { Box } from '@components/theme'
import { BoxProps } from '@shopify/restyle';
import React, { useCallback } from 'react'
import { StyleSheet, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { add, clockRunning, cond, eq, not, set, stopClock, useCode } from 'react-native-reanimated';
import { clamp, timing, useClock, usePanGestureHandler, useValue, withSpring } from 'react-native-redash';

const ABox: typeof Box = Animated.createAnimatedComponent(Box);
const { width, height } = Dimensions.get('window');

const TAB_HEIGHT = 60;
const MIN_HEIGHT = 100;
const SNAP_BOTTOM = height - MIN_HEIGHT - TAB_HEIGHT;
const SNAP_TOP = 0;
const snapPoints = [SNAP_TOP, SNAP_BOTTOM];

const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1
};
const Container = () => {
  const { gestureHandler, translation, state, velocity } = usePanGestureHandler();
  const offsetY = useValue<number>(SNAP_BOTTOM);
  const translateY = clamp(withSpring({
    snapPoints,
    value: translation.y,
    velocity: velocity.y,
    state,
    offset: offsetY,
    config
  }), 0, height);
  const clock = useClock();
  const goUp = useValue<number>(0);

  const open = useCallback(() => {
    goUp.setValue(1);
  }, [goUp]);

  useCode(() => [
    cond(goUp, [
      set(offsetY, timing({ duration: 300, from: offsetY, to: SNAP_TOP, clock })),
      cond(not(clockRunning(clock)), set(goUp, 0))
    ])
  ], [])
  return (
    <ABox
      borderTopLeftRadius='xl'
      borderTopRightRadius='xl'
      backgroundColor='brownBlack'
      style={[styles.container, { transform: [{ translateY }] }]}
    >
      <TouchableWithoutFeedback onPress={open}>
        <Box height={50} width='100%' backgroundColor='cheese' />
      </TouchableWithoutFeedback>
      <PanGestureHandler {...gestureHandler}>
        <ABox height={MIN_HEIGHT} width='100%' >

        </ABox>
      </PanGestureHandler>
    </ABox>
  )
}

export default Container;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height,
    width,
  }
})
