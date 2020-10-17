import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Modal,
  ActivityIndicator
} from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
export const { width, height } = Dimensions.get('window');
import * as SecureStore from 'expo-secure-store';

import Color from '../../../constants/Color';

import { AppForm, AppFormField } from '../../../components/forms';
//import FormImagePicker from '../../../components/ImageList/FormImagePicker'
import { cleanUserErrors } from '../../../redux/user/reducer.actions';

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { signupStartProvider } from '../../../redux/user/signup/signup.actions';

import SubmitButton from '../../../components/forms/SubmitButton';
import CustomButton from '../../../custom/CustomButton';
import CustomLayout from '../../../custom/CustomLayout';
import CustomText from '../../../custom/CustomText';
import { ScrollView } from 'react-native-gesture-handler';

import { providerData } from '../../../utilis/providerData';

interface ILocation {
  latitude: number;
  longitude: number;
}

interface IData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  address: string;
  vat: string;
  position: ILocation;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  vat: string;
}

interface Props {
  signupStartProvider: (userData: IData) => AnyAction;
  err: Error;
  cleanUserErrors: () => AnyAction;
  isLoading: boolean;
  textType: boolean;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label('Activity Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null!], 'Passwords must match')
    .label('Confirm Password'),
  vat: Yup.string().required().label('Activity Vat Number')
  //images: Yup.array().min(1, "Pleaseselect at least 1 image")
});

const SignupProvider: React.FC<Props> = ({
  signupStartProvider,
  cleanUserErrors,
  err,
  isLoading,
  textType
}) => {
  const navigation = useNavigation();

  const resetLogin = async () => {
    await SecureStore.deleteItemAsync('jwt');
    cleanUserErrors();
    navigation.navigate('SignupProvider');
  };

  if (err) {
    return (
      <CustomLayout style={styles.container}>
        <CustomText type="extra-bold-italic" style={styles.text}>
          Something went rong. Please go back and try again!
        </CustomText>
        <CustomButton
          buttonWidth="70%"
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

  const callTheBackendWithProviderData = (data: IUser) => {
    const userData: IData = {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      address: providerData.address,
      vat: data.vat,
      position: providerData.coords[0]
    };

    signupStartProvider(userData);
  };

  return (
    <ScrollView contentContainerStyle={{ height: height * 1.1, width }}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        <CustomLayout>
          <View style={styles.container}>
            <View style={styles.header}>
              <CustomText type="extra-bold-italic" style={styles.text}>
                Signup Coffee Provider:
              </CustomText>
              <CustomButton
                name="electric-switch"
                buttonWidth="70%"
                style={styles.button1}
                size={15}
                color="white"
                fontSize={12}
                animation="pulse"
                textType="bold"
                text="Switch To Signup User"
                onPress={() => navigation.navigate('SignupUser')}
              />
            </View>
            <AppForm
              initialValues={{
                name: '',
                email: '',
                password: '',
                passwordConfirm: '',
                vat: ''
              }}
              onSubmit={values => callTheBackendWithProviderData(values)}
              validationSchema={validationSchema}
            >
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="account"
                keyboardType="default"
                name="name"
                placeholder="Activity Name"
                textContentType="name"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="at"
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
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="numeric"
                keyboardType="default"
                name="vat"
                placeholder="Activity VAT Number"
                textContentType="location"
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
        </CustomLayout>
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
            <CustomText type="extra-bold-italic" style={styles.text1}>
              Creating Coffee Provider ...
            </CustomText>
            <ActivityIndicator size="large" />
          </CustomLayout>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    marginBottom: 20,
    padding: 10,
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
  header: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  text1: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30
  },
  button1: {
    marginTop: 10,
    marginBottom: 20
  },
  button2: {
    marginTop: 10,
    marginBottom: 100,
    alignSelf: 'center'
  },
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center', height }
});

const mapStateToProps = ({ user, textType }: any) => ({
  isLoading: user.isLoadingSignup,
  err: user.err,
  textType: textType.textType
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      signupStartProvider,
      cleanUserErrors
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SignupProvider);
