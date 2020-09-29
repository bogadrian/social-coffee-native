import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Modal
} from 'react-native';

import * as Yup from 'yup';

import * as SecureStore from 'expo-secure-store';

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import CustomText from '../../custom/CustomText';
import CustomLayout from '../../custom/CustomLayout';
import CustomButton from '../../custom/CustomButton';

import { AppForm, AppFormField } from '../../components/forms';
import SubmitButton from '../../components/forms/SubmitButton';

export const { width, height } = Dimensions.get('window');

import { startResetPassword } from '../../redux/user/resetPassword/reset.actions';
import { cleanUserErrors } from '../../redux/user/reducer.actions';

import Color from '../../constants/Color';

import { IUserType } from '../../types/user.types';

interface Props {
  route: any;
  startResetPassword: ({ values, token }: IResetValues) => AnyAction;
  user: IUserType;
  cleanUserErrors: () => AnyAction;
  navigation: any;
  err: Error;
  isLoading: boolean;
  textType: boolean;
}

interface IValues {
  password: string;
  passwordConfirm: string;
}

interface IResetValues {
  token: string;
  values: IValues;
}

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height
  },
  text: {
    fontSize: 18,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 20
  },
  text1: {
    fontSize: 14,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 10
  },
  text2: {
    fontSize: 16,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 10
  },
  text4: {
    fontSize: 18,
    color: 'orange',
    width: width * 0.8,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  button1: {
    marginTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  appform: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(8).label('Password'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null!], 'Passwords must match')
    .label('Confirm Password')
});

const ResetPasswordScreen: React.FC<Props> = ({
  route,
  navigation,
  startResetPassword,
  cleanUserErrors,
  err,
  isLoading,
  textType
}) => {
  const [h, setH] = useState<boolean>(false);

  const { token } = route.params;

  const resetHandler = async (values: IValues) => {
    setH(true);

    startResetPassword({ values, token });
  };

  const handleOk = async () => {
    navigation.navigate('Account');
  };

  const quit = async () => {
    await SecureStore.deleteItemAsync('jwt');
    cleanUserErrors();
    navigation.navigate('Account');
  };

  return (
    <CustomLayout style={styles.layout}>
      <CustomText type="extra-bold" style={styles.text}>
        Reset Password
      </CustomText>
      <CustomText type="light" style={styles.text1}>
        The password must be minumum 8 carachters long.
      </CustomText>
      <View style={styles.appform}>
        <AppForm
          initialValues={{ password: '', passwordConfirm: '' }}
          onSubmit={values => resetHandler(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            show={true}
            name="password"
            placeholder=" New Password"
            secureTextEntry={textType}
            textContentType="password"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            show={true}
            name="passwordConfirm"
            placeholder="Confirm New Password"
            secureTextEntry={textType}
            textContentType="password"
          />
          <SubmitButton
            buttonWidth="60%"
            style={styles.button1}
            name="account-heart-outline"
            size={15}
            color={Color.tertiary}
            fontSize={14}
            animation="fadeIn"
            textType="bold"
            text="Reset Password"
          />
        </AppForm>
        {h ? (
          <Modal
            animationType="slide"
            transparent={false}
            visible={h}
            onRequestClose={() => {
              console.log('modal closed');
            }}
          >
            <CustomLayout style={styles.layout}>
              {isLoading ? (
                <View style={styles.view}>
                  <CustomText type="black" style={styles.text2}>
                    Reseting Your Password ...
                  </CustomText>
                  <ActivityIndicator size="large" />
                </View>
              ) : null}
              {!isLoading && err ? (
                <View style={styles.view}>
                  <CustomText type="black" style={styles.text2}>
                    {err.message}
                  </CustomText>
                  <CustomText type="italic" style={styles.text4}>
                    Please try agian!
                  </CustomText>
                  <CustomButton
                    buttonWidth="40%"
                    name="account-heart-outline"
                    size={18}
                    color="cyan"
                    fontSize={12}
                    textType="bold"
                    text="Try Again!"
                    onPress={() => setH(false)}
                  />
                </View>
              ) : null}
              {!isLoading && !err ? (
                <CustomText type="bold" style={styles.text2}>
                  Password Reseted!
                </CustomText>
              ) : null}
              {!err && !isLoading ? (
                <CustomButton
                  buttonWidth="40%"
                  name="account-heart-outline"
                  size={18}
                  color="cyan"
                  fontSize={12}
                  textType="bold"
                  text="OK"
                  onPress={handleOk}
                />
              ) : null}
            </CustomLayout>
          </Modal>
        ) : null}
        <View style={{ marginTop: 40 }}>
          <CustomButton
            buttonWidth="40%"
            name="account-heart-outline"
            size={18}
            color="cyan"
            fontSize={12}
            textType="bold"
            text="Quit"
            onPress={quit}
          />
        </View>
      </View>
    </CustomLayout>
  );
};

const mapStateToProps = ({ user, textType }: any) => ({
  err: user.err,
  isLoading: user.isLoadingReset,
  user: user.user,
  textType: textType.textType
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      startResetPassword,
      cleanUserErrors
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordScreen);
