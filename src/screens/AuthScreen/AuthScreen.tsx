import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');

import CustomLayout from '../../custom/CustomLayout'

import NotLogin from './components/NotLogin'
import Settings from './components/Settings'

interface Props {
 
}

const styles = StyleSheet.create({
  layout: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', height },
  text: { 
    fontSize: 20, 
    color: 'white',
    width: width * 0.80,
    textAlign: 'center',
  }
});

const AuthScreen: React.FC<Props> = () => {
  const auth = false
  return (
    <CustomLayout style={styles.layout}>
      {auth ? <Settings /> : <NotLogin />}
    </CustomLayout>
  );
};


export default AuthScreen;
