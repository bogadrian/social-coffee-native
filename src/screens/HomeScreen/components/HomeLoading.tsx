import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
//import { useNavigation } from '@react-navigation/native';

export const { width, height } = Dimensions.get('window');

import CustomLayout from '../../../custom/CustomLayout';
import HomeNonAuth from './HomeNonAuth';

import AuthScreen from '../../AuthScreen/AuthScreen';

interface Props {
  user: any;
}

const HomeLoading: React.FC<Props> = ({ user }) => {
  //const navigation = useNavigation();

  return (
    <CustomLayout style={styles.layout}>
      {!user ? <HomeNonAuth /> : <AuthScreen />}
    </CustomLayout>
  );
};
const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height
  }
});

export default HomeLoading;
