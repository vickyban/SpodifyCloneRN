import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { BottomTabDescriptor, BottomTabNavigationHelpers } from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import { RoundedIcon } from '@components/common'
import React, { memo } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { Text } from '@components/theme'

type TabProps = BottomTabBarButtonProps & {
  index: number;
  route: any;
  navigation: BottomTabNavigationHelpers
  descriptors: any
}

const Tab = ({ descriptors, route }: TabProps) => {
  const { options } = descriptors[route.key];
  const tabIcon = options.tabIcon;

  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name;
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <RoundedIcon
          name={tabIcon.name}
          IconType={tabIcon.type}
          size={30}
          color='white'
        />
        <Text variant='itemSubTitle' textAlign='center'>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
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
