import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

export const { width, height } = Dimensions.get('window');

import Login from './components/Login';
import AuthScreen from '../AuthScreen/AuthScreen';

import CustomLayout from '../../custom/CustomLayout';

interface Props {
  user: any;
}

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height
  }
});

const AccountScreen: React.FC<Props> = ({ user }) => {
  console.log('usser account screen', user);
  return <React.Fragment>{user ? <AuthScreen /> : <Login />}</React.Fragment>;
};

const mapStateToProps = ({ user }: any) => ({
  user: user.user,
  isLoading: user.isLoading
});

export default connect(mapStateToProps)(AccountScreen);
