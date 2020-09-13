import React from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';

export const { width, height } = Dimensions.get('window');

import Login from './components/Login';
import AuthScreen from '../AuthScreen/AuthScreen';

interface Props {
  user: any;
}

const AccountScreen: React.FC<Props> = ({ user }) => {
  console.log('usser account screen', user);
  return <React.Fragment>{user ? <AuthScreen /> : <Login />}</React.Fragment>;
};

const mapStateToProps = ({ user }: any) => ({
  user: user.user,
  isLoading: user.isLoading
});

export default connect(mapStateToProps)(AccountScreen);
