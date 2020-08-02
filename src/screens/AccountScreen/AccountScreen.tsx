import React from 'react';
import { StyleSheet, View } from 'react-native';

import Login from './components/Login'
import CustomLayout from '../../custom/CustomLayout'

interface Props {
  type: string;
}

const styles = StyleSheet.create({
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

const AccountScreen: React.FC<Props> = () => {
  return (
    <CustomLayout style={styles.layout}>
      <Login />
    </CustomLayout>
  );
};

export default AccountScreen;
