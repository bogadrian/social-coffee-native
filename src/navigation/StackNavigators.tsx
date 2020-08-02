import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {MaterialCommunityIcons} from '@expo/vector-icons'

import playSound from '../customHooks/sound'

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import {HomeStack, InfoStack, AuthStack, AccountStack, MyComunitiesStack} from './Stacks/Stacks'

import Color from '../constants/Color'

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  switch (routeName) {
    case 'Settings':
      return 'Settings';
    case 'Home':
      return 'Home';
    case 'Info':
      return 'Info';
    case 'Account':
      return 'My Account';
    case 'My Comunities':
      return 'My Comuities'
  }
}

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  
  const play = () => {
    playSound()
  }
  
  return (
    <Tab.Navigator  
    activeColor='coral'
    inactiveColor='white'
   screenOptions={{ 
     
}}
    barStyle={{backgroundColor: Color.backGroundPrimary}}
    
  >
      <Tab.Screen 
      name="Home"  
       listeners={{
        tabPress: () => play() 
      }}
      component={HomeStack} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home-outline" color={color} size={26}  />
        ),
      }}
       /> 
        <Tab.Screen 
       name="My Comunities" 
       listeners={{
        tabPress: () => play() 
      }}
       component={MyComunitiesStack}
        options={{
         tabBarLabel: 'Comunity',
         tabBarIcon: ({ color }) => (
           <MaterialCommunityIcons name="account-group-outline" color={color} size={26} />
         ),
       }}/>
        <Tab.Screen 
       name="Donate" 
       component={AuthStack}
       listeners={{
        tabPress: () => play() 
      }}
       options={{
         tabBarLabel: 'Donate',
         tabBarIcon: ({ color }) => (
           <MaterialCommunityIcons name="plus-circle-outline" color="red" size={26} />
         ),
       }} />
      <Tab.Screen 
      name="Settings" 
      component={AuthStack}
      listeners={{
        tabPress: () => play() 
      }}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="settings-outline" color={color} size={26} />
        ),
      }} />
      <Tab.Screen 
      name="Account" 
      component={AccountStack}
      listeners={{
        tabPress: () => play() 
      }}
      options={{
        tabBarLabel: 'Account',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-heart-outline" color={color} size={26} />
        ),
      }} />
    
    </Tab.Navigator>
  );
}

const MainStackNavigator = createStackNavigator();

export const MainStack: React.FC = props => {
  return (
    <MainStackNavigator.Navigator >
      {true && (
        <MainStackNavigator.Screen 
        name="Home Stack" 
        component={MyTabs} 
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerStyle: {backgroundColor: Color.backGroundPrimary},
          headerTintColor: 'white',
          
        })}
        />
      )}
      {false && (
        <MainStackNavigator.Screen 
        name="Info Stack" 
        component={InfoStack} 
        options={{
          headerShown: false,
        }}/>
      )}
    </MainStackNavigator.Navigator>
  );
};
