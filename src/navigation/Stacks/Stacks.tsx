import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import Color from '../../constants/Color'

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import InfoScreen from '../../screens/InfoScreen/InfoScreen';
import AuthScreen from '../../screens/AuthScreen/AuthScreen';
import AccountScreen from '../../screens/AccountScreen/AccountScreen';
import MyComunitiesScreen from '../../screens/MyComunities/MyComunitiesScreen';


const HomeStackNavigator = createStackNavigator();



export const HomeStack: React.FC = () => {
  return (
    <HomeStackNavigator.Navigator >
      <HomeStackNavigator.Screen 
      name="Home" 
      component={HomeScreen} 
      />
    </HomeStackNavigator.Navigator>
  );
};

const InfoStackNavigator = createStackNavigator();

export const InfoStack: React.FC = () => {
  return (
    <InfoStackNavigator.Navigator>
      <HomeStackNavigator.Screen 
      name="Info" 
      component={InfoScreen} 
      options={{ 
        headerShown: false, 
        }}/>
    </InfoStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthStack: React.FC = () => {
  return (
    <AuthStackNavigator.Navigator>
      <HomeStackNavigator.Screen 
      name="Auth" 
      component={AuthScreen}  
      />
    </AuthStackNavigator.Navigator>
  );
};

const AccountStackNavigator = createStackNavigator();

export const AccountStack: React.FC = () => {
  return (
    <AccountStackNavigator.Navigator>
      <HomeStackNavigator.Screen 
      name="Acoount" 
      component={AccountScreen}  
      />
    </AccountStackNavigator.Navigator>
  );
};

const MyComunitiesStackNavigator = createStackNavigator();

export const MyComunitiesStack: React.FC = () => {
  return (
    <MyComunitiesStackNavigator.Navigator>
      <HomeStackNavigator.Screen 
      name="Acoount" 
      component={MyComunitiesScreen}  
      />
    </MyComunitiesStackNavigator.Navigator>
  );
};

