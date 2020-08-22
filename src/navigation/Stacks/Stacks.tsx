import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import InfoScreen from '../../screens/InfoScreen/InfoScreen';

import AuthScreen from '../../screens/AuthScreen/AuthScreen';
import SignupScreen from '../../screens/AccountScreen/SignupScreen';
import SignupUser from '../../screens/AccountScreen/components/SignupUser';
import SignupProvider from '../../screens/AccountScreen/components/SignupProvider';

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
    <InfoStackNavigator.Navigator headerMode="none" >
      <HomeStackNavigator.Screen 
      name="AppInfo" 
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
    <AccountStackNavigator.Navigator initialRouteName="AccountScreen">
      <HomeStackNavigator.Screen 
      name="Account" 
      component={AccountScreen}  
      />
      <HomeStackNavigator.Screen 
      name="Signup" 
      component={SignupScreen}  
      />
      <HomeStackNavigator.Screen 
      name="SignupUser" 
      component={SignupUser}  
      />
      <HomeStackNavigator.Screen 
      name="SignupProvider" 
      component={SignupProvider}  
      />
    </AccountStackNavigator.Navigator>
  );
};

const MyComunitiesStackNavigator = createStackNavigator();

export const MyComunitiesStack: React.FC = () => {
  return (
    <MyComunitiesStackNavigator.Navigator>
      <HomeStackNavigator.Screen 
      name="Comunities" 
      component={MyComunitiesScreen}  
      />
    </MyComunitiesStackNavigator.Navigator>
  );
};

