import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { BottomTabDescriptor, BottomTabNavigationHelpers } from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import { RoundedIcon } from '@components/common'
import React, { memo, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@components/theme';
import { BorderlessButton } from 'react-native-gesture-handler';

type TabProps = BottomTabBarButtonProps & {
  index: number;
  route: any;
  navigation: BottomTabNavigationHelpers
  descriptors: any;
  isFocused: boolean;
}

const Tab = ({ descriptors, route, navigation, isFocused }: TabProps) => {
  const { options } = descriptors[route.key];
  const tabIcon = options.tabIcon;

  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name;

  const onPress = useCallback(() => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  }, [navigation, isFocused]);

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={onPress}>
        <RoundedIcon
          name={tabIcon.name}
          IconType={tabIcon.type}
          size={30}
          color='white'
        />
        <Text variant='itemSubTitle' textAlign='center'>{label}</Text>
      </BorderlessButton>
    </View>
  )
}

export default memo(Tab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
