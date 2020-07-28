import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {HomeStack, InfoStack, AuthStack} from './Stacks/Stacks'

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Settings" component={AuthStack} />
    </Tab.Navigator>
  );
}

const MainStackNavigator = createStackNavigator();

export const MainStack: React.FC = props => {
  return (
    <MainStackNavigator.Navigator>
      {true && (
        <MainStackNavigator.Screen name="Home Stack" component={MyTabs} />
      )}
      {false && (
        <MainStackNavigator.Screen name="Info Stack" component={InfoStack} />
      )}
    </MainStackNavigator.Navigator>
  );
};
