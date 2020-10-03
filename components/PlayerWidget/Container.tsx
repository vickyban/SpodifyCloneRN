import { Box } from '@components/theme'
import React, { useCallback } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { PanGestureHandler, State, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { add, clockRunning, cond, Extrapolate, interpolate, neq, not, onChange, set, stopClock, useCode } from 'react-native-reanimated';
import { clamp, timing, useClock, usePanGestureHandler, useValue, withSpring } from 'react-native-redash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FullPlayer from './FullPlayer';
import MinPlayer, { MINI_PLAYER_HEIGHT } from './MinPlayer';

const ABox = Animated.createAnimatedComponent(Box);
const { width, height } = Dimensions.get('window');

const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1
};

type ContainerProps = {
  tabbarHeight: number;
  widgetTranslateY: Animated.Value<number>;
}
const Container = ({ tabbarHeight, widgetTranslateY }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const top = height - (insets.bottom + MINI_PLAYER_HEIGHT + tabbarHeight);
  const { gestureHandler, translation, state, velocity } = usePanGestureHandler();
  const offsetY = useValue<number>(0);
  const translateY = clamp(withSpring({
    snapPoints: [0, -top],
    value: translation.y,
    velocity: velocity.y,
    state,
    offset: offsetY,
    config
  }), -top, 0);
  const clock = useClock();
  const goUp = useValue<number>(0);

  const open = useCallback(() => {
    goUp.setValue(1);
  }, [goUp]);

  useCode(() => [
    cond(goUp, [
      set(offsetY, timing({ duration: 300, from: offsetY, to: -top, clock })),
      cond(not(clockRunning(clock)), set(goUp, 0))
    ])
  ], []);

  useCode(() => [
    onChange(translateY, set(widgetTranslateY, translateY))
  ], []);

  const opacity = interpolate(translateY, {
    inputRange: [-10, 0],
    outputRange: [0, 1]
  });
  const fullPlayerTranslateY = interpolate(translateY, {
    inputRange: [-20, -10],
    outputRange: [0, MINI_PLAYER_HEIGHT],
    extrapolate: Extrapolate.CLAMP
  });
  const fullPlayerOpacity = interpolate(translateY, {
    inputRange: [-50, -20],
    outputRange: [1, 0]
  });
  return (
    <PanGestureHandler {...gestureHandler}>
      <ABox
        backgroundColor='brownBlack'
        top={top}
        style={[styles.container, { transform: [{ translateY }] }]}
      >
        <ABox style={{ opacity }} >
          <TouchableWithoutFeedback onPress={open}>
            <MinPlayer />
          </TouchableWithoutFeedback>
        </ABox>
        <ABox position='absolute' style={{ transform: [{ translateY: fullPlayerTranslateY }] }} backgroundColor='brownBlack'>
          <ABox style={{ opacity: fullPlayerOpacity }}>
            <FullPlayer />
          </ABox>
        </ABox>
      </ABox>
    </PanGestureHandler>
  )
}

export default Container;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
  }
})
