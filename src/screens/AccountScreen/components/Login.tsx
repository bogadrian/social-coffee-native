import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Text,
  Dimensions,
  Modal,
  ActivityIndicator
} from 'react-native';

import * as Yup from 'yup';
import axios from 'axios';

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
import { URL } from '../../../constants/variables';

import CustomText from '../../../custom/CustomText';
import CustomLayout from '../../../custom/CustomLayout';
import CustomButton from '../../../custom/CustomButton';
import Divider from '../../../custom/Divider';

import { AppForm, AppFormField } from '../../../components/forms';
import SubmitButton from '../../../components/forms/SubmitButton';

import { IUserType } from '../../../types/user.types';

interface ILogin {
  email: string;
  password: string;
}

interface Props {
  loginStartUser: ({ email, password }: ILogin) => AnyAction;
  loginStartProvider: ({ email, password }: ILogin) => AnyAction;
  cleanUserErrors: () => AnyAction;
  user: IUserType;
  err: Error;
  isLoading: boolean;
  textType: boolean;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password')
});

const validationSchemaForgot = Yup.object().shape({
  email: Yup.string().required().email().label('Email')
});

const Login: React.FC<Props> = ({
  loginStartUser,
  loginStartProvider,
  cleanUserErrors,
  user,
  err,
  isLoading,
  textType
}) => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState<string>('user');
  const [modal, setModal] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [text, setText] = useState<string>('Enter your email please!');

  const resetLogin = async () => {
    await SecureStore.deleteItemAsync('jwt');
    cleanUserErrors();
    navigation.navigate('Account');
  };

  if (err) {
    return (
      <CustomLayout style={styles.layout}>
        <CustomText type="extra-bold-italic" style={styles.text}>
          Operation went wrong. Please chek your connection and try agin!
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

  const forgotHandler = (): void => {
    setModal(true);
  };

  const forgotPasswordHandler = (email: string) => {
    setLoad(true);
    //call forgot password end-point
    if (userType === 'user') {
      axios
        .post(`${URL}/api/v1/users/forgotPassword`, { email })
        .then((response: any) => {
          setLoad(false);
          setText(response.data.message);
        })
        .catch(error => {
          setLoad(false);
          setText(error.message);
        });
    }

    if (userType === 'coffee provider') {
      axios
        .post(`${URL}/api/v1/provider/forgotPassword`, { email })
        .then(response => {
          setLoad(false);
          setText(response.data.message);
        })
        .catch(error => {
          setLoad(false);
          setText(error.message);
        });
    }
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
              ? 'Login as regular USER'
              : 'Login as COFFEE PROVIDER'}
          </CustomText>
          <CustomText type="extra-bold-italic" style={styles.text2}>
            or:
          </CustomText>
          <CustomButton
            buttonWidth="85%"
            style={styles.button2}
            name="electric-switch"
            size={28}
            color="coral"
            fontSize={12}
            animation="pulse"
            textType="bold"
            text={
              userType === 'user'
                ? 'Switch to Login COFFEE PROVIDER'
                : 'Switch To Login USER'
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
              show={true}
              placeholder="Password"
              secureTextEntry={textType}
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
          </AppForm>
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
          <TouchableOpacity onPress={forgotHandler}>
            <CustomText type="extra-bold-italic" style={styles.text2}>
              {userType.toUpperCase()} , have you forgot your password?
            </CustomText>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      {isLoading ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isLoading}
          onRequestClose={() => {
            console.log('modal closed');
          }}
        >
          <CustomLayout style={styles.layout}>
            <CustomText type="extra-bold-italic" style={styles.text2}>
              Loggin You In ...
            </CustomText>
            <ActivityIndicator size="large" />
          </CustomLayout>
        </Modal>
      ) : null}
      {modal ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            console.log('some action');
          }}
        >
          <CustomLayout style={styles.layout}>
            {load ? (
              <ActivityIndicator size="large" />
            ) : (
              <View style={{ alignItems: 'center' }}>
                <CustomText type="light" style={styles.textWarrning}>
                  Please make sure you are asking to reset the password for the
                  right "USER" or "COFFEE PROVIDER". Close and check out how you
                  try to login!
                </CustomText>
                <CustomText type="extra-bold-italic" style={styles.text}>
                  {text}
                </CustomText>
              </View>
            )}

            <Divider style={styles.divider} />

            <AppForm
              initialValues={{ email: '' }}
              onSubmit={({ email }) => forgotPasswordHandler(email)}
              validationSchema={validationSchemaForgot}
            >
              <View style={{ width: width * 0.9 }}>
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="email"
                  keyboardType="email-address"
                  name="email"
                  placeholder="Email"
                  textContentType="emailAddress"
                />
                <SubmitButton
                  buttonWidth="90%"
                  style={styles.button}
                  name="account-arrow-right-outline"
                  size={24}
                  color={Color.tertiary}
                  fontSize={12}
                  animation="fadeIn"
                  textType="bold"
                  text={'Send Pssword Resest Request'}
                />
              </View>
            </AppForm>

            <Divider style={styles.divider} />
            <CustomButton
              buttonWidth="50%"
              name="close"
              size={15}
              color="red"
              fontSize={14}
              animation="tada"
              textType="bold"
              text="Close"
              onPress={() => {
                setModal(false);
              }}
            />
          </CustomLayout>
        </Modal>
      ) : null}
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
    fontSize: 16,
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center'
  },
  textWarrning: {
    fontSize: 14,
    padding: 30,
    marginTop: 10,
    margin: 10,
    textAlign: 'center'
  },
  layout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height,
    width
  },
  textLoogedIn: {
    fontSize: 20,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 20
  },
  divider: {
    marginTop: 20
  },
  button: {
    marginTop: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
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

const mapStateToProps = ({ user, textType }: any) => ({
  user: user.user,
  err: user.err,
  textType: textType.textType,
  isLoading: user.isLoadingLogin
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
