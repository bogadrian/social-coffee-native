import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');

import * as SecureStore from 'expo-secure-store';

import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';

import axios from 'axios';
import { URL } from '../../../constants/variables';

import { cleanUserErrors } from '../../../redux/user/reducer.actions';
import { userGetStart } from '../../../redux/user/getMe/users.actions';

import CustomLayout from '../../../custom/CustomLayout';
import CustomButton from '../../../custom/CustomButton';

import AuthScreen from '../AuthScreen';

import UpdateUser from './user/updateUser';
import UpdateProvider from './provider/updateProvider';

interface Props {
  user: any;
  cleanUserErrors: any;
  userGetStart: any;
}

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height
  },
  text: {
    fontSize: 20,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center'
  }
});

const Settings: React.FC<Props> = ({ user, userGetStart, cleanUserErrors }) => {
  const navigation = useNavigation();

  if (user.role === 'user') {
    return <UpdateUser />;
  }

  if (user.role === 'coffee-provider') {
    return <UpdateProvider />;
  }

  return (
    <CustomLayout style={styles.layout}>
      <Text>Please login</Text>
    </CustomLayout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      cleanUserErrors,
      userGetStart
    },
    dispatch
  );

const mapStateToProps = ({ user }: any) => ({
  user: user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
