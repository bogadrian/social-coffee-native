import React from 'react';
import { ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './StackNavigators';

import * as Linking from 'expo-linking';

const prefix1 = Linking.makeUrl('/reset/:token', { token: 'token' });
const prefix2 = Linking.makeUrl('/confirmation');

const linkingConfig: any = {
  prefixes: [prefix1, prefix2]
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer
      linking={linkingConfig}
      fallback={<ActivityIndicator size="large" />}
    >
      <MainStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
