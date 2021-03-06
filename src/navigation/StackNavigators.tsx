import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { useSelector } from 'react-redux';

import * as SecureStore from 'expo-secure-store';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import playSound from '../customHooks/sound';

import UserImage from '../components/UserImage';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import {
  HomeStack,
  InfoStack,
  AuthStack,
  AccountStack,
  ResetPasswordStack,
  QRCodeStack,
  ScanMenuStack,
  ViewMenuStack
} from './Stacks/Stacks';

import MyComunitiesScreen from '../screens/MyComunities/MyComunitiesScreen';

import Color from '../constants/Color';

function getHeaderTitle(route: any) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  switch (routeName) {
    case 'Settings':
      return 'Settings';
    case 'Home':
      return 'Home';
    case 'AppInfo':
      return 'App Info';
    case 'Account':
      return 'Account';
    case 'My Comunities':
      return 'Comunity';
  }
}

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  const user = useSelector<{ user: any }>(state => state.user.user);

  useEffect(() => {
    const res = async () => {
      const token = await SecureStore.getItemAsync('jwt');

      console.log('user in tabs first render', user, token);
    };
    res();
  });

  const play = async () => {
    await playSound();
  };

  return (
    <Tab.Navigator
      activeColor="coral"
      inactiveColor="white"
      screenOptions={{}}
      barStyle={{ backgroundColor: Color.backGroundPrimary }}
    >
      <Tab.Screen
        name="Home"
        listeners={{
          tabPress: () => play()
        }}
        component={user ? MyComunitiesScreen : HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name="My Communities"
        listeners={{
          tabPress: () => play()
        }}
        component={MyComunitiesScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              color={color}
              size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name="Donate"
        component={AuthStack}
        listeners={{
          tabPress: () => play()
        }}
        options={{
          tabBarLabel: 'Donate',

          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color="red"
              size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={AuthStack}
        listeners={{
          tabPress: () => play()
        }}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="settings-outline"
              color={color}
              size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        listeners={{
          tabPress: () => play()
        }}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-heart-outline"
              color={color}
              size={26}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

// hide this
//const QrStackNavigator = createMaterialBottomTabNavigator();

// export const QrStackN: React.FC = () => {
//   return (
//     <QrStackNavigator.Navigator>
//       <QrStackNavigator.Screen name="rrr" component={QRCodeStack} />
//       <QrStackNavigator.Screen name="tabs" component={MyTabs} />
//     </QrStackNavigator.Navigator>
//   );
// };

const MainStackNavigator = createStackNavigator();

export const MainStack: React.FC = () => {
  const info = useSelector<{ isInfo: { info: boolean } }>(
    state => state.isInfo.info
  );

  return (
    <MainStackNavigator.Navigator>
      {info ? (
        <MainStackNavigator.Screen
          name="AppInfo"
          component={InfoStack}
          options={{
            headerShown: false
          }}
        />
      ) : null}
      <MainStackNavigator.Screen
        name="Home Stack"
        component={MyTabs}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerStyle: { backgroundColor: Color.backGroundPrimary },
          headerTintColor: 'white',
          headerLeft: () => <UserImage />
        })}
      />
      <MainStackNavigator.Screen
        name="Info"
        component={InfoStack}
        options={{
          headerShown: false
        }}
      />
      <MainStackNavigator.Screen
        name="Reset"
        component={ResetPasswordStack}
        options={{
          headerShown: false
        }}
      />
      <MainStackNavigator.Screen
        name="QR"
        component={QRCodeStack}
        options={{
          headerShown: false
        }}
      />
      <MainStackNavigator.Screen
        name="Scan"
        component={ScanMenuStack}
        options={{
          headerShown: false
        }}
      />
      <MainStackNavigator.Screen
        name="View"
        component={ViewMenuStack}
        options={{
          headerShown: false
        }}
      />
    </MainStackNavigator.Navigator>
  );
};
