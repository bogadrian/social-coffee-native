import React from 'react';

import * as SecureStore from 'expo-secure-store';

import { StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

export const { width, height } = Dimensions.get('window');

import Color from '../../constants/Color';

import { cleanUserErrors } from '../../redux/user/reducer.actions';

import CustomLayout from '../../custom/CustomLayout';
import CustomText from '../../custom/CustomText';
import CustomButton from '../../custom/CustomButton';
import Divider from '../../custom/Divider';

import { IUserType } from '../../types/user.types';

interface Props {
  user: IUserType;
  cleanUserErrors: () => AnyAction;
}

const SignupScreen: React.FC<Props> = ({ user, cleanUserErrors }) => {
  const navigation = useNavigation();

  const handleSignupUser = async () => {
    await SecureStore.deleteItemAsync('jwt');
    navigation.navigate('SignupUser');
  };

  const handleSignupProvider = async () => {
    await SecureStore.deleteItemAsync('jwt');
    navigation.navigate('SignupProvider');
  };

  if (
    (user && user.role === 'user') ||
    (user && user.role === 'coffee-provider')
  ) {
    return (
      <CustomLayout style={styles.container}>
        <Text style={styles.textLoogedIn}>You are allready logged in! </Text>
        {navigation.navigate('Settings')}
        <CustomButton
          buttonWidth="50%"
          name="account-heart-outline"
          size={15}
          color="yellow"
          fontSize={14}
          animation="pulse"
          textType="bold"
          text="My Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </CustomLayout>
    );
  }

  return (
    <CustomLayout style={styles.container}>
      <CustomText type="extra-bold-italic" style={styles.text1}>
        SignUp as Regular User
      </CustomText>
      <CustomText type="thin" style={styles.text2}>
        What is a Regular User?
      </CustomText>
      <CustomButton
        buttonWidth="50%"
        name="account-edit"
        size={24}
        color={Color.tertiary}
        fontSize={14}
        animation="pulse"
        textType="bold"
        text="User Signup"
        onPress={() => handleSignupUser()}
      />
      <Divider style={styles.divider} />
      <CustomText type="extra-bold-italic" style={styles.text1}>
        SignUp as Coffe Provider
      </CustomText>
      <CustomText type="thin" style={styles.text2}>
        What is a Coffe Provider?
      </CustomText>
      <CustomButton
        buttonWidth="50%"
        name="account-edit"
        size={24}
        color="coral"
        fontSize={14}
        textType="bold"
        text="Provider Signup"
        onPress={() => handleSignupProvider()}
      />
      <CustomButton
        buttonWidth="40%"
        style={styles.lastButton}
        name="arrow-left-bold"
        size={15}
        color="white"
        fontSize={14}
        textType="bold"
        text="Back to Login"
        onPress={() => {
          navigation.navigate('Account');
          cleanUserErrors();
        }}
      />
    </CustomLayout>
  );
};
const styles = StyleSheet.create({
  text1: {
    fontSize: 16,
    marginBottom: 10
  },
  text2: {
    fontSize: 14,
    marginBottom: 10
  },
  container: {
    flexGrow: 1,
    height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    marginBottom: 20,
    marginTop: 20
  },
  lastButton: {
    marginTop: 60
  },
  textLoogedIn: {
    fontSize: 20,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 20
  }
});

const mapStateToProps = ({ user }: any) => ({
  user: user.user,
  isLoading: user.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      cleanUserErrors
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
