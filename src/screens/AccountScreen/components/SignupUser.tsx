import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  Dimensions,
  Modal,
  ActivityIndicator
} from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
export const { width, height } = Dimensions.get('window');

import * as SecureStore from 'expo-secure-store';
import { cleanUserErrors } from '../../../redux/user/reducer.actions';

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { signupStartUser } from '../../../redux/user/signup/signup.actions';

import Color from '../../../constants/Color';

import CustomText from '../../../custom/CustomText';
import { AppForm, AppFormField } from '../../../components/forms';
import SubmitButton from '../../../components/forms/SubmitButton';
import CustomButton from '../../../custom/CustomButton';
import CustomLayout from '../../../custom/CustomLayout';

import { IUserType } from '../../../types/user.types';

interface IValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface Props {
  signupStartUser: (values: IValues) => AnyAction;
  user: IUserType;
  cleanUserErrors: () => AnyAction;
  err: Error;
  isLoading: boolean;
  textType: boolean;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null!], 'Passwords must match')
    .label('Confirm Password')
});

const SignupUser: React.FC<Props> = ({
  signupStartUser,
  user,
  isLoading,
  err,
  cleanUserErrors,
  textType
}) => {
  const navigation = useNavigation();

  const resetLogin = async () => {
    await SecureStore.deleteItemAsync('jwt');
    cleanUserErrors();
    navigation.navigate('SignupUser');
  };

  if (err) {
    return (
      <CustomLayout style={styles.container}>
        <CustomText type="extra-bold-italic" style={styles.text}>
          Something went wrong. Please check your connection and try again!{' '}
        </CustomText>
        <CustomButton
          buttonWidth="50%"
          name="step-backward"
          size={15}
          color="yellow"
          fontSize={14}
          animation="pulse"
          textType="bold"
          text="Go Back"
          onPress={() => resetLogin()}
        />
      </CustomLayout>
    );
  }

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
          animation="tada"
          textType="bold"
          text="My Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </CustomLayout>
    );
  }

  const signupUserHandler = (values: IValues) => {
    signupStartUser(values);
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <CustomLayout>
        <View style={styles.containerFields}>
          <CustomText type="extra-bold-italic" style={styles.text}>
            Signup User:
          </CustomText>
          <CustomButton
            name="electric-switch"
            buttonWidth="80%"
            style={styles.button1}
            size={15}
            color="white"
            fontSize={12}
            animation="pulse"
            textType="bold"
            text="Switch To Signup Coffee Provider"
            onPress={() => navigation.navigate('SignupProvider')}
          />
          <AppForm
            initialValues={{
              name: '',
              email: '',
              password: '',
              passwordConfirm: ''
            }}
            onSubmit={values => signupUserHandler(values)}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              keyboardType="default"
              name="name"
              placeholder="Name"
              textContentType="name"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              show={true}
              name="password"
              placeholder="Password"
              secureTextEntry={textType}
              textContentType="password"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              show={true}
              name="passwordConfirm"
              placeholder="Confirm Password"
              secureTextEntry={textType}
              textContentType="password"
            />
            <SubmitButton
              buttonWidth="40%"
              style={styles.button2}
              name="account-heart-outline"
              size={15}
              color={Color.tertiary}
              fontSize={14}
              animation="fadeIn"
              textType="bold"
              text="Signup"
            />
          </AppForm>
        </View>
        {isLoading && !err && (
          <Modal
            animationType="slide"
            transparent={false}
            visible={isLoading}
            onRequestClose={() => {
              console.log('modal closed');
            }}
          >
            <CustomLayout style={styles.container}>
              <CustomText type="extra-bold-italic" style={styles.text1}>
                Creating User...
              </CustomText>
              <ActivityIndicator size="large" />
            </CustomLayout>
          </Modal>
        )}
      </CustomLayout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height,
    padding: 10,
    marginTop: 0,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerFields: {
    padding: 10,
    marginTop: 50,
    marginBottom: 150,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  text1: {
    fontSize: 20,
    marginBottom: 30
  },
  button1: {
    marginTop: 10,
    marginBottom: 20
  },
  button2: {
    marginTop: 30,
    marginBottom: 80
  },
  textLoogedIn: {
    fontSize: 20,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 20
  }
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      signupStartUser,
      cleanUserErrors
    },
    dispatch
  );

const mapStateToProps = ({ user, textType }: any) => ({
  user: user.user,
  isLoading: user.isLoadingSignup,
  err: user.err,
  textType: textType.textType
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupUser);
