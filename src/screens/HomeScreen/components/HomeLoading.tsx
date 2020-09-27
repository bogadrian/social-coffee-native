import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window');

import CustomLayout from '../../../custom/CustomLayout';
import HomeNonAuth from './HomeNonAuth';

import AuthScreen from '../../AuthScreen/AuthScreen';

import { IUserType } from '../../../types/user.types';

interface Props {
  user: IUserType;
}

const HomeLoading: React.FC<Props> = ({ user }) => {
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
