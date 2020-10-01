import React, { ComponentProps, useCallback, useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import RoundedIconButton from './RoundedIconButton';
import RoundIcon from './RoundIcon';
import { Box } from '@components/theme';
import { useTransition, withTransition } from 'react-native-redash';
import Animated, { concat, cond, interpolate, not, sub, useValue } from 'react-native-reanimated';
import Toast from 'react-native-fast-toast';

const ABox = Animated.createAnimatedComponent(Box);

export type LikeButtonProps = ComponentProps<typeof RoundedIconButton> & {
}

const LikeButton = ({ onPress, containerStyle, ...props }: LikeButtonProps) => {
  const toast = useRef(null);
  const [like, setLike] = useState(false);
  const alike = useValue<number>(0);
  const transition = withTransition(alike, { duration: 300 });
  const opacity = interpolate(transition, {
    inputRange: [0, 0.6],
    outputRange: [0, 1]
  })
  const scale = cond(alike, interpolate(transition, {
    inputRange: [0, 0.3, 0.6, 1],
    outputRange: [1, 0.8, 1.4, 1]
  }), 1);

  const translateX = cond(not(alike),
    interpolate(transition, {
      inputRange: [0, 0.1, .3, 0.4, 0.5, 0.6, 0.8, 0.9, 1],
      outputRange: [0, -5, 0, 4, 0, -3, 0, 2, 0],
    }),
    0);
  const rotateZ = cond(not(alike),
    interpolate(transition, {
      inputRange: [0, 0.1, .3, 0.4, 0.5, 0.6, 0.8, 0.9, 1],
      outputRange: [0, -25, 0, 15, 0, -15, 0, 15, 0],
    }),
    0);
  const onPressButton = useCallback(() => {
    // setLike(v => !v);
    alike.setValue(not(alike))
  }, [onPress, setLike]);

  // useEffect(() => {
  //   if (like)
  //     toast.current?.show("Added to Your library!!!");
  //   else {
  //     toast.current?.show("Removed from Your library!!!", { type: 'danger' });
  //   }
  // }, [like])
  return (
    <>
      <ABox {...containerStyle} style={{
        transform: [
          { translateX },
          { rotateZ: concat(rotateZ, 'deg') },
          { scale }
        ]
      }}>
        <Animated.View style={{ opacity: sub(1, opacity) }}>
          <RoundIcon {...props} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFillObject, { opacity }]}>
          <RoundedIconButton
            onPress={onPressButton}
            {...props}
            name='heart'
            color='brandPrimary'
          />
        </Animated.View>
      </ABox>
      <Toast ref={toast} />
    </>
  )
}

export default LikeButton;

LikeButton.defaultProps = {
  name: 'heart-outlined'
}

const styles = StyleSheet.create({})
