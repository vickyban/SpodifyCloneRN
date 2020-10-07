import { Box, Text } from '@components/theme';
import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { cond, eq, multiply, useValue, useCode, onChange, debug, concat, divide, set, sub, add, interpolate, Extrapolate, and, neq, call } from 'react-native-reanimated';
import { clamp, usePanGestureHandler, useTransition } from 'react-native-redash';
import Svg, { Line } from 'react-native-svg';

const RADIUS = 8;
const ABox = Animated.createAnimatedComponent(Box);
const ALine = Animated.createAnimatedComponent(Line);

type ProgressBarProps = {
  tabHeight: number;
  min?: number;
  max: number;
  enableSlider?: boolean;
  value: number;
  onSliding: (value: number) => void;
  onSlidingEnd: (value: number) => void
};

/*
 min = 20;
 max = 80;

 value = 50;


(50 - min) /max  = percent
30/80

percent * max + min;
*/

const ProgressBar = ({
  tabHeight,
  min = 0,
  max,
  value = 0,
  onSliding,
  onSlidingEnd,
  enableSlider,
}: ProgressBarProps) => {
  const width = useValue(0);
  const curValue = useTransition(value, { duration: 100 });

  const progress = cond(eq(min, max), 0, divide(curValue, sub(max, min)));

  const { gestureHandler, translation, state } = usePanGestureHandler();
  const offsetX = multiply(progress, width);
  const translateX = useValue(0);
  const time = interpolate(translateX, {
    inputRange: [0, width],
    outputRange: [min, max],
    extrapolate: Extrapolate.CLAMP
  });

  const onLayout = useCallback(({ nativeEvent }) => {
    width.setValue(nativeEvent.layout.width)
  }, []);

  useCode(() => [
    cond(and(eq(state, State.UNDETERMINED), neq(offsetX, translateX)), set(translateX, offsetX)),
    cond(eq(state, State.ACTIVE), [
      set(translateX, clamp(add(offsetX, translation.x), 0, width)),
      call([time], values => onSliding(values[0]))
    ]),
    cond(eq(state, State.END), [
      call([time], values => onSlidingEnd(values[0]))
    ])
  ], [min, max])

  return (
    <Box
      backgroundColor='grey30'
      zIndex={100}
      onLayout={onLayout}
    >
      <Svg height={tabHeight} width='100%'>
        <ALine
          x1="0"
          x2={concat(multiply(progress, 100), '%')}
          y1='50%'
          y2='50%'
          stroke="white"
          strokeLinecap="round"// not working
          strokeWidth={tabHeight} />
      </Svg>
      {enableSlider && (
        <PanGestureHandler {...gestureHandler}>
          <Animated.View style={[{
            position: 'absolute',
            top: tabHeight / 2 - RADIUS,
            left: - RADIUS,
            transform: [{ translateX }]
          }, styles.circle]} />
        </PanGestureHandler>
      )}
    </Box >
  )
}

export default ProgressBar
const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    backgroundColor: 'white'
  }
})
