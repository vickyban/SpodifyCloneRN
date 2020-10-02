import { Ionicons, Entypo, EvilIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '@screens/HomeScreen';
import AlbumScreen from '@screens/homeStack/AlbumScreen';
import SearchAlbumSongScreen from '@screens/homeStack/SearchAlbumSongScreen';
import SongDetailScreen from '@screens/homeStack/SongDetailScreen';

import AllGenreScreen from '@screens/searchStack/AllGenreScreen';
import AlbumsByGenreScreen from '@screens/searchStack/AlbumsByGenreScreen';
import SearchScreen from '@screens/searchStack/SearchScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

import TabBar from '@components/navigation/BottomTabBar';
import { PlayerProvider } from '@components/PlayerWidget';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <PlayerProvider>
      <BottomTab.Navigator
        initialRouteName="Home"
        tabBar={props => <TabBar {...props} />}
        tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ color }) => <Entypo name="home" color={color} size={30} style={{ marginBottom: -3 }} />,
            tabIcon: {
              name: 'home',
              type: Entypo
            }
          }}
        />
        <BottomTab.Screen
          name="Search"
          component={SearchNavigator}
          options={{
            tabBarIcon: ({ color }) => <EvilIcons name="search" color={color} size={30} style={{ marginBottom: -3 }} />,
            tabIcon: {
              name: 'search',
              type: EvilIcons
            }
          }}
        />
        {/* <BottomTab.Screen
        name="Your Library"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="library-music-outline" color={color} size={30} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="Premium"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="spotify" color={color} size={30} style={{ marginBottom: -3 }} />,
        }}
      /> */}
      </BottomTab.Navigator>
    </PlayerProvider>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<TabOneParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
      <HomeStack.Screen
        name="AlbumDetail"
        component={AlbumScreen}

        options={{
          headerShown: false
          // headerTransparent: true,
          // headerTitle: 'Album'
        }}
      />
      <HomeStack.Screen
        name="SearchAlbumSong"
        component={SearchAlbumSongScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress
            }
          })
        }}
      />
      <HomeStack.Screen
        name="SongDetail"
        component={SongDetailScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
          cardStyle: {
            backgroundColor: 'transparent'
          }
        }}
      />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator<TabTwoParamList>();

function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="AllGenre"
        component={AllGenreScreen}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="AlbumsByGenre"
        component={AlbumsByGenreScreen}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress
            }
          })
        }}
      />
    </SearchStack.Navigator>
  );
}
