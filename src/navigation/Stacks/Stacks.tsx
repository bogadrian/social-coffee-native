import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import InfoScreen from '../../screens/InfoScreen/InfoScreen';
import AuthScreen from '../../screens/AuthScreen/AuthScreen';

const HomeStackNavigator = createStackNavigator();

export const HomeStack: React.FC = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
    </HomeStackNavigator.Navigator>
  );
};

const InfoStackNavigator = createStackNavigator();

export const InfoStack: React.FC = () => {
  return (
    <InfoStackNavigator.Navigator>
      <HomeStackNavigator.Screen name="Info" component={InfoScreen} />
    </InfoStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthStack: React.FC = () => {
  return (
    <AuthStackNavigator.Navigator>
      <HomeStackNavigator.Screen name="Auth" component={AuthScreen} />
    </AuthStackNavigator.Navigator>
  );
};

