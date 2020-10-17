import React from 'react';

//import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import InfoScreen from '../../screens/InfoScreen/InfoScreen';

import AuthScreen from '../../screens/AuthScreen/AuthScreen';
import SignupScreen from '../../screens/AccountScreen/SignupScreen';
import SignupUser from '../../screens/AccountScreen/components/SignupUser';
import SignupProvider from '../../screens/AccountScreen/components/SignupProvider';

import AccountScreen from '../../screens/AccountScreen/AccountScreen';

import MyComunitiesScreen from '../../screens/MyComunities/MyComunitiesScreen';
import MyCommunityScreen from '../../screens/MyComunities/components/MyCommunity';
import CommunityMapScreen from '../../screens/MyComunities/components/CommunityMap';

import ResetPasswordScreen from '../../screens/ResetPassword/ResetPassword';

import QRcodeScreen from '../../screens/QRCode/QRCodeScreen';
import ScanMenuScreen from '../../screens/ScanMenu/ScanMenuScreen';

import ViewMenuScreen from '../../screens/ViewMenu/ViewMenuScreen';

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
    <InfoStackNavigator.Navigator headerMode="none">
      <HomeStackNavigator.Screen
        name="AppInfo"
        component={InfoScreen}
        options={{
          headerShown: false
        }}
      />
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

const AccountStackNavigator = createStackNavigator();

export const AccountStack: React.FC = () => {
  return (
    <AccountStackNavigator.Navigator initialRouteName="AccountScreen">
      <HomeStackNavigator.Screen name="Account" component={AccountScreen} />
      <HomeStackNavigator.Screen name="Signup" component={SignupScreen} />
      <HomeStackNavigator.Screen name="SignupUser" component={SignupUser} />
      <HomeStackNavigator.Screen
        name="SignupProvider"
        component={SignupProvider}
      />
    </AccountStackNavigator.Navigator>
  );
};

// const MyComunitiesStackNavigator = createStackNavigator();

// export const MyComunitiesStack: React.FC = () => {
//   return (
//     <MyComunitiesStackNavigator.Navigator>
//       <HomeStackNavigator.Screen
//         name="Comunities"
//         component={MyComunitiesScreen}
//       />
//     </MyComunitiesStackNavigator.Navigator>
//   );
// };

const ResetPasswordStackNavigator = createStackNavigator();

export const ResetPasswordStack: React.FC = () => {
  return (
    <ResetPasswordStackNavigator.Navigator headerMode="none">
      <HomeStackNavigator.Screen name="Reset" component={ResetPasswordScreen} />
    </ResetPasswordStackNavigator.Navigator>
  );
};

const QRCodeStackNavigator = createStackNavigator();

export const QRCodeStack: React.FC = () => {
  return (
    <QRCodeStackNavigator.Navigator headerMode="none">
      <HomeStackNavigator.Screen
        name="Qr Code"
        component={QRcodeScreen}
        options={{}}
      />
    </QRCodeStackNavigator.Navigator>
  );
};

const ScanMenuStackNavigator = createStackNavigator();

export const ScanMenuStack: React.FC = () => {
  return (
    <ScanMenuStackNavigator.Navigator headerMode="none">
      <ScanMenuStackNavigator.Screen
        name="Qr Code Scan"
        component={ScanMenuScreen}
        options={{}}
      />
    </ScanMenuStackNavigator.Navigator>
  );
};

const ViewMenuStackNavigator = createStackNavigator();

export const ViewMenuStack: React.FC = () => {
  return (
    <ViewMenuStackNavigator.Navigator headerMode="none">
      <ViewMenuStackNavigator.Screen
        name="Qr Code Scan"
        component={ViewMenuScreen}
        options={{}}
      />
    </ViewMenuStackNavigator.Navigator>
  );
};
