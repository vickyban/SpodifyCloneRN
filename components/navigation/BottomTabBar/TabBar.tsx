import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Box } from '@components/theme';
import React from 'react'
import { StyleSheet } from 'react-native';
import Tab from './Tab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const TAB_BAR_HEIGHT = 60;

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Box backgroundColor='brownBlack' style={{ paddingBottom: insets.bottom }}>
      <Box height={TAB_BAR_HEIGHT} width='100%' flexDirection='row'>
        {
          state.routes.map((route, index) => <Tab
            key={`tab-${index}`}
            index={index}
            route={route}
            navigation={navigation}
            descriptors={descriptors}
          />)
        }
      </Box>
    </Box>
  )
}

export default TabBar

const styles = StyleSheet.create({})
