import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {HomeStack, InfoStack, AuthStack} from './Stacks/Stacks'


// import HomeScreen from '../screens/HomeScreen/HomeScreen';
// import InfoScreen from '../screens/Info/InfoScreen';
// import AuthScreen from '../screens/AuthScreen/AuthScreen';

// const HomeStackNavigator = createStackNavigator();

// const HomeStack: React.FC = () => {
//   return (
//     <HomeStackNavigator.Navigator>
//       <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
//     </HomeStackNavigator.Navigator>
//   );
// };

// const InfoStackNavigator = createStackNavigator();

// const InfoStack: React.FC = () => {
//   return (
//     <InfoStackNavigator.Navigator>
//       <HomeStackNavigator.Screen name="Info" component={InfoScreen} />
//     </InfoStackNavigator.Navigator>
//   );
// };

// const AuthStackNavigator = createStackNavigator();

// const AuthStack: React.FC = () => {
//   return (
//     <AuthStackNavigator.Navigator>
//       <HomeStackNavigator.Screen name="Auth" component={AuthScreen} />
//     </AuthStackNavigator.Navigator>
//   );
// };

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
