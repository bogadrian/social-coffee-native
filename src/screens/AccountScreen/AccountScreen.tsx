import React from 'react';
import { StyleSheet, View } from 'react-native';

import Login from './components/Login'
import MyComunitiesScreen from '../MyComunities/MyComunitiesScreen'


import CustomLayout from '../../custom/CustomLayout'

interface Props {
}

const styles = StyleSheet.create({
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center', height: 1000 }
});

const AccountScreen: React.FC<Props> = () => {
  const auth = false
  return (
    <CustomLayout style={styles.layout}>
     
  {auth ? <MyComunitiesScreen/> :<Login /> }
    
    </CustomLayout>
  );
};

export default AccountScreen;
