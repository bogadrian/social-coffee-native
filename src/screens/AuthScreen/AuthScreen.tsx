import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  Modal,
  ActivityIndicator
} from 'react-native';
export const { width, height } = Dimensions.get('window');
import * as Yup from 'yup';

import axios from 'axios';

import * as SecureStore from 'expo-secure-store';

import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';

import { AppForm, AppFormField } from '../../components/forms';
import SubmitButton from '../../components/forms/SubmitButton';

import CustomLayout from '../../custom/CustomLayout';
import CustomText from '../../custom/CustomText';
import CustomButton from '../../custom/CustomButton';
import Divider from '../../custom/Divider';

import Color from '../../constants/Color';
import { URL } from '../../constants/variables';

import { cleanUserErrors } from '../../redux/user/reducer.actions';
import { userGetStart } from '../../redux/user/getMe/users.actions';

import NotLogin from './components/NotLogin';
import Settings from './components/Settings';

import { IUserType } from '../../types/user.types';

interface Props {
  user: IUserType;
  cleanUserErrors: () => AnyAction;
  userGetStart: () => AnyAction;
}

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height
  },
  text: {
    fontSize: 16,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 20
  },
  text2: {
    fontSize: 14,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 20
  },
  textNoConfirm: {
    fontSize: 14,
    color: '#ffccff',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 20
  },
  textRed: {
    fontSize: 20,
    color: 'red',
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

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email')
});

const AuthScreen: React.FC<Props> = ({
  user,
  cleanUserErrors,
  userGetStart
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [text, setText] = useState<string>('Please re-insert your email here');
  const [load, setLoad] = useState<boolean>(false);
  const [noConfim, setNoConfirm] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, [text]);

  const resendEmailhandler = (email: string) => {
    setLoad(true);
    axios
      .patch(`${URL}/api/v1/users/resend-confirmation`, {
        email
      })
      .then((res: any) => {
        setText(res.data.data.message);
        setLoad(false);
      })
      .catch(() => {
        setText('No such an email found!');
      });
    axios
      .patch(`${URL}/api/v1/provider/resend-confirmation`, {
        email
      })
      .then((res: any) => {
        setText(res.data.data.message);
        setLoad(false);
      })
      .catch(() => {
        setText('No such an email found!');
      });
  };

  const resendEmail = () => {
    setModal(true);
  };

  const trySignupAgain = async () => {
    await SecureStore.deleteItemAsync('jwt');
    cleanUserErrors();
    fetch(`${URL}/api/v1/users/deleteMe`, { method: 'DELETE' })
      .then(() => {
        userGetStart();
        navigation.navigate('Signup');
      })
      .catch((e: any) => console.log(e));
    fetch(`${URL}/api/v1/provider/deleteMe`, { method: 'DELETE' })
      .then(() => {
        userGetStart();
        navigation.navigate('Signup');
      })
      .catch((e: any) => console.log(e));
  };

  const handleDone = () => {
    userGetStart();
    setNoConfirm(true);
  };

  if (user && user.emailConfirm === false) {
    return (
      <CustomLayout style={styles.layout}>
        <CustomText type="semibold" style={styles.text}>
          <Text>Hi </Text>
          <Text style={{ color: Color.tertiary }}> {user.name}! </Text>
          <Text>
            Please check your inbox an confirm your email before using this app!
          </Text>
        </CustomText>
        <Divider style={styles.divider} />
        <CustomText type="light" style={styles.text2}>
          If You already confirmed your email please press this button:
        </CustomText>
        {user.emailConfirm === false && noConfim ? (
          <CustomText type="light" style={styles.textNoConfirm}>
            You didn't confirmed your email yet! Please confirm your email or
            resend a confirmation email or signup again if you wish!
          </CustomText>
        ) : null}
        <CustomButton
          buttonWidth="60%"
          name="account-heart-outline"
          size={15}
          color={Color.tertiary}
          fontSize={14}
          textType="bold"
          text="I've done that!"
          onPress={handleDone}
        />
        <Divider style={styles.divider} />
        <CustomButton
          buttonWidth="60%"
          name="account-heart-outline"
          size={15}
          color="yellow"
          fontSize={14}
          animation="pulse"
          textType="bold"
          text="Resend Email"
          onPress={() => resendEmail()}
        />
        <Divider style={styles.divider} />
        <CustomButton
          buttonWidth="60%"
          name="account-heart-outline"
          size={15}
          color="cyan"
          fontSize={14}
          textType="bold"
          text="SignUp Again"
          onPress={() => trySignupAgain()}
        />
        {modal ? (
          <Modal
            animationType="slide"
            transparent={false}
            visible={true}
            onRequestClose={() => {
              console.log('some action');
            }}
          >
            <CustomLayout style={styles.layout}>
              {load ? (
                <ActivityIndicator size="large" />
              ) : (
                <CustomText type="extra-bold-italic" style={styles.text}>
                  {text}
                </CustomText>
              )}

              <Divider style={styles.divider} />

              <AppForm
                initialValues={{ email: '' }}
                onSubmit={({ email }) => resendEmailhandler(email)}
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
                <SubmitButton
                  buttonWidth="60%"
                  style={styles.button}
                  name="account-arrow-right-outline"
                  size={24}
                  color={Color.tertiary}
                  fontSize={12}
                  animation="fadeIn"
                  textType="bold"
                  text={'ResendEmail'}
                />
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
        <Divider style={styles.divider} />
      </CustomLayout>
    );
  }

  return (
    <CustomLayout style={styles.layout}>
      {user ? <Settings /> : <NotLogin />}
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
