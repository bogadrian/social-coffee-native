import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Dimensions,
  Modal,
  ActivityIndicator
} from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
export const { width, height } = Dimensions.get('window');
import * as SecureStore from 'expo-secure-store';

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  loginStartUser,
  loginStartProvider
} from '../../../redux/user/login/login.actions';
import { cleanUserErrors } from '../../../redux/user/reducer.actions';

import Color from '../../../constants/Color';

import CustomText from '../../../custom/CustomText';
import CustomLayout from '../../../custom/CustomLayout';
import CustomButton from '../../../custom/CustomButton';

import { AppForm, AppFormField } from '../../../components/forms';
import SubmitButton from '../../../components/forms/SubmitButton';

interface Props {
  loginStartUser: any;
  loginStartProvider: any;
  cleanUserErrors: any;
  user: any;
  err: any;
  isLoading: boolean;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password')
});

const Login: React.FC<Props> = ({
  loginStartUser,
  loginStartProvider,
  cleanUserErrors,
  user,
  err,
  isLoading
}) => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState<string>('user');

  const resetLogin = () => {
    SecureStore.deleteItemAsync('jwt');
    cleanUserErrors();
    navigation.goBack();
  };

  if (err) {
    return (
      <CustomLayout style={styles.layout}>
        <CustomText type="extra-bold-italic" style={styles.text}>
          {err.message}
        </CustomText>
        <CustomButton
          buttonWidth="50%"
          name="account-heart-outline"
          size={15}
          color="yellow"
          fontSize={14}
          animation="tada"
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
      <CustomLayout style={styles.layout}>
        <Text style={styles.textLoogedIn}>You are allready logged in! </Text>
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

  const switchUser = () => {
    if (userType === 'user') {
      setUserType('coffee provider');
    } else {
      setUserType('user');
    }
  };

  const loginHandler = (email: string, password: string): void => {
    userType === 'user'
      ? loginStartUser({ email, password })
      : loginStartProvider({ email, password });
  };

  return (
    <CustomLayout style={styles.container}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.content}>
          <CustomText type="extra-bold-italic" style={styles.text}>
            {userType === 'user'
              ? 'Login as regular User'
              : 'Login as Coffee Provider'}
          </CustomText>
          <CustomText type="extra-bold-italic" style={styles.text2}>
            or:
          </CustomText>
          <CustomButton
            buttonWidth="80%"
            style={styles.button2}
            name="electric-switch"
            size={28}
            color="coral"
            fontSize={12}
            animation="pulse"
            textType="bold"
            text={
              userType === 'user'
                ? 'Switch to Login Coffe Provider'
                : 'Switch To Login User'
            }
            onPress={switchUser}
          />
          <AppForm
            initialValues={{ email: '', password: '' }}
            onSubmit={({ email, password }) => loginHandler(email, password)}
            validationSchema={validationSchema}
          >
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
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton
              buttonWidth="60%"
              style={styles.button1}
              name="account-arrow-right-outline"
              size={24}
              color={Color.tertiary}
              fontSize={12}
              animation="fadeIn"
              textType="bold"
              text={userType === 'user' ? 'Login User' : 'Login Coffe Provider'}
            />

            <CustomButton
              buttonWidth="60%"
              style={styles.button3}
              name="account-switch"
              size={24}
              color="white"
              fontSize={14}
              animation="pulse"
              textType="bold"
              text="Switch To Signup"
              onPress={() => navigation.navigate('Signup')}
            />
          </AppForm>
        </View>
      </TouchableWithoutFeedback>
      {isLoading && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={isLoading}
          onRequestClose={() => {
            console.log('modal closed');
          }}
        >
          <CustomLayout style={styles.layout}>
            <CustomText type="extra-bold-italic" style={styles.text2}>
              Loggin in the User...
            </CustomText>
            <ActivityIndicator size="large" />
          </CustomLayout>
        </Modal>
      )}
    </CustomLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height,
    flexGrow: 1,
    padding: 10
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button1: {
    marginTop: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  button2: {
    marginTop: 10,
    marginBottom: 20
  },
  button3: {
    marginTop: 40,
    marginBottom: 30
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    width: width * 0.9,
    textAlign: 'center'
  },
  text2: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5
  },
  layout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height
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
      loginStartUser,
      loginStartProvider,
      cleanUserErrors
    },
    dispatch
  );

const mapStateToProps = ({ user }: any) => ({
  user: user.user,
  err: user.err,
  isLoading: user.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
