import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  Image,
  ActivityIndicator
} from 'react-native';

export const { width, height } = Dimensions.get('window');

import * as SecureStore from 'expo-secure-store';

import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';

import axios from 'axios';
import { URL } from '../../../../constants/variables';

import { cleanUserErrors } from '../../../../redux/user/reducer.actions';
import { userGetStart } from '../../../../redux/user/getMe/users.actions';

import CustomLayout from '../../../../custom/CustomLayout';
import CustomButton from '../../../../custom/CustomButton';
import CustomText from '../../../../custom/CustomText';
import Divider from '../../../../custom/Divider';

import Color from '../../../../constants/Color';

import SubmitButton from '../../../../components/forms/SubmitButton';

import FormImagePicker from '../../../../components/ImageList/FormImagePicker';
import { AppForm, AppFormField } from '../../../../components/forms';

import { startUpdateMe } from '../../../../redux/user/updateMe/update.actions';
import { startPasswordChange } from '../../../../redux/user/changePassword/changePassword.actions';

import { IUserType } from '../../../../types/user.types';

interface Props {
  user: IUserType;
  err: Error;
  isLoadingUpd: boolean;
  isLoadingPass: boolean;
  cleanUserErrors: () => AnyAction;
  userGetStart: () => AnyAction;
  startUpdateMe: (values: IUpdateValues) => AnyAction;
  startPasswordChange: (values: IPasswordValues) => AnyAction;
  changeSuccess: boolean;
  textType: boolean;
}

interface IUpdateValues {
  name: string;
  description: string;
  images: string[];
  u?: string;
}

interface IPasswordValues {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
  u?: string;
}

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
    height: height * 1.6
  },
  layoutModal: {
    flexDirection: 'column',
    justifyContent: 'center',
    height,
    width
  },
  appForm: {
    width: width * 0.9,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  text: {
    fontSize: 20,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center'
  },
  areaText: {
    height: height * 0.1,
    width: width * 0.9,
    padding: 20
  },
  textModal: {
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
    marginLeft: 10
  },
  textModal1: {
    textAlign: 'center',
    fontSize: 14,
    padding: 10
  },
  thirdText: {
    fontSize: 16,
    color: 'cyan',
    marginLeft: 5,
    marginRight: 5
  },
  hi: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10
  },
  updateText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center'
  },
  updateText1: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center'
  },
  text3: {
    fontSize: 14,
    color: Color.tertiary,
    marginBottom: 20,
    textAlign: 'center'
  },
  text4: {
    fontSize: 14,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center'
  },
  button2: {
    marginTop: 30,
    marginBottom: 20,
    alignSelf: 'center'
  }
});

const validationSchemaUpdate = Yup.object().shape({
  name: Yup.string().label('Activity Name'),
  description: Yup.string().label('Description'),
  images: Yup.array().label('Image')
});

const validationSchemaPassword = Yup.object().shape({
  passwordCurrent: Yup.string().required().min(8).label('Password'),
  password: Yup.string().required().min(8).label('Password'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null!], 'Passwords must match')
    .label('Confirm Password')
});

const UpdateUser: React.FC<Props> = ({
  user,
  err,
  userGetStart,
  cleanUserErrors,
  startUpdateMe,
  isLoadingUpd,
  startPasswordChange,
  isLoadingPass,
  changeSuccess,
  textType
}) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [password, setPassword] = useState<boolean>(false);
  const [textForPass, setTextPass] = useState<boolean>(false);
  const [errorDelete, setErrorDelete] = useState<boolean>(false);

  const navigation = useNavigation();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('jwt');
    axios
      .get(`${URL}/api/v1/users/logout`)
      .then(response => {
        console.log(response);
        cleanUserErrors();
      })
      .catch(error => {
        console.log(error);
        cleanUserErrors();
      });
    userGetStart();

    navigation.navigate('Home');
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleBlocked = () => {};

  const handleChangePassword = () => {
    setPassword(true);
  };

  const handleDelete = async () => {
    const token = await SecureStore.getItemAsync('jwt');

    try {
      await axios.delete(`${URL}/api/v1/users/deleteMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      userGetStart();
    } catch (err) {
      console.log(err);
      setErrorDelete(true);
    }
  };

  const handleUpdateMe = (values: IUpdateValues) => {
    const u: string = 'user';
    const userData = { ...values, u };
    startUpdateMe(userData);
  };

  const handleChangePasswordValues = (values: IPasswordValues) => {
    const u: string = 'user';
    const userData = { ...values, u };
    startPasswordChange(userData);
    setTextPass(true);
  };

  const handleCloseUpdate = () => {
    setUpdate(false);
    userGetStart();
  };

  const handleClosePassword = () => {
    setPassword(false);
    userGetStart();
  };

  return (
    <CustomLayout style={styles.layout}>
      <View
        style={{
          flexDirection: 'row',
          width: width * 0.4,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30
        }}
      >
        <CustomText type="semibold" style={styles.hi}>
          Hi
        </CustomText>
        <CustomText type="semibold" style={styles.thirdText}>
          {user.name}
        </CustomText>
      </View>
      <CustomText type="semibold" style={styles.hi}>
        Welcome to your profile settings!
      </CustomText>
      <CustomText type="black" style={styles.updateText1}>
        Here you can:
      </CustomText>
      <Divider style={{ marginTop: 30 }} />
      <CustomText type="extra-light" style={styles.updateText}>
        Add a photo and a description that people can see on your profile,
        change your name.
      </CustomText>
      <CustomButton
        buttonWidth="80%"
        name="account-heart-outline"
        size={15}
        color={Color.tertiary}
        fontSize={14}
        textType="bold"
        text="Update My Profile"
        onPress={() => handleUpdate()}
      />
      <Divider style={{ marginTop: 30 }} />
      <CustomText type="extra-light" style={styles.updateText}>
        If you have blocked some people, here you can manage those blockes!
      </CustomText>
      <CustomButton
        buttonWidth="80%"
        name="account-heart-outline"
        size={15}
        color={Color.primary}
        fontSize={14}
        textType="bold"
        text="People I blocked"
        onPress={() => handleBlocked()}
      />
      <Divider style={{ marginTop: 30 }} />
      <CustomText type="extra-light" style={styles.updateText}>
        Logout!
      </CustomText>
      <CustomButton
        buttonWidth="40%"
        name="account-heart-outline"
        size={15}
        color="cyan"
        fontSize={14}
        textType="bold"
        text="Logout"
        onPress={() => handleLogout()}
      />
      <Divider style={{ marginTop: 30 }} />
      <CustomText type="extra-light" style={styles.updateText}>
        Change My Password
      </CustomText>
      <CustomButton
        buttonWidth="40%"
        name="account-heart-outline"
        size={15}
        color={Color.secondary}
        fontSize={14}
        textType="bold"
        text="Change"
        onPress={() => handleChangePassword()}
      />
      <Divider style={{ marginTop: 30 }} />
      <CustomText type="extra-light" style={styles.updateText}>
        Delete my profile! You won't be seen anywhere on this app. You can
        always reactivate your account just by simply loggin in again!
      </CustomText>
      {errorDelete && (
        <CustomText type="extra-light" style={styles.updateText}>
          That didn't work! Please check your connection and try again!
        </CustomText>
      )}
      <CustomButton
        buttonWidth="40%"
        name="account-heart-outline"
        size={15}
        color="red"
        fontSize={14}
        textType="bold"
        text="Delete Me"
        onPress={() => handleDelete()}
      />
      <Divider style={{ marginBottom: 20, marginTop: 20 }} />
      {update ? (
        <Modal
          animationType="slide"
          transparent={false}
          visible={update}
          onRequestClose={() => {
            console.log('modal closed');
          }}
        >
          {isLoadingUpd ? (
            <CustomLayout style={styles.layoutModal}>
              <CustomText type="light" style={styles.textModal}>
                Updating ...
              </CustomText>
              <ActivityIndicator size="large" />
            </CustomLayout>
          ) : (
            <CustomLayout style={styles.layoutModal}>
              <View style={styles.appForm}>
                <AppForm
                  initialValues={{
                    name: '',
                    description: '',
                    images: []
                  }}
                  onSubmit={values => handleUpdateMe(values)}
                  validationSchema={validationSchemaUpdate}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{ uri: `${user.photo}` }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        marginTop: 5
                      }}
                    />
                    <CustomText type="light" style={styles.textModal}>
                      Add or Update your photo?
                    </CustomText>
                  </View>

                  <FormImagePicker name="images" numberPhoto={0} />
                  <CustomText type="light" style={styles.textModal1}>
                    Change your name?
                  </CustomText>
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="account"
                    keyboardType="default"
                    name="name"
                    placeholder={user.name ? user.name : 'Name'}
                    textContentType="name"
                  />
                  <CustomText type="light" style={styles.textModal1}>
                    Add or Update your description?
                  </CustomText>
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    name="description"
                    placeholder={
                      user.description ? user.description : 'Add a description'
                    }
                    multiline={true}
                    textContentType="name"
                    style={styles.areaText}
                  />

                  <SubmitButton
                    buttonWidth="70%"
                    style={styles.button2}
                    name="account-heart-outline"
                    size={15}
                    color={Color.tertiary}
                    fontSize={14}
                    animation="fadeIn"
                    textType="bold"
                    text="Update my profile"
                  />
                </AppForm>
                <View style={{ alignSelf: 'center' }}>
                  <CustomButton
                    buttonWidth="40%"
                    name="close"
                    size={15}
                    color="cyan"
                    fontSize={14}
                    textType="bold"
                    text="Close"
                    onPress={handleCloseUpdate}
                  />
                </View>
              </View>
            </CustomLayout>
          )}
        </Modal>
      ) : null}
      {password ? (
        <Modal
          animationType="slide"
          transparent={false}
          visible={password}
          onRequestClose={() => {
            console.log('modal closed');
          }}
        >
          {isLoadingPass ? (
            <CustomLayout style={styles.layoutModal}>
              <CustomText type="light" style={styles.textModal}>
                Changing your password ...
              </CustomText>
              <ActivityIndicator size="large" />
            </CustomLayout>
          ) : (
            <CustomLayout style={styles.layoutModal}>
              <View style={styles.appForm}>
                <AppForm
                  initialValues={{
                    passwordCurrent: '',
                    password: '',
                    passwordConfirm: ''
                  }}
                  onSubmit={values => handleChangePasswordValues(values)}
                  validationSchema={validationSchemaPassword}
                >
                  <CustomText type="light" style={styles.textModal}>
                    Change Your Password
                  </CustomText>
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    show={true}
                    name="passwordCurrent"
                    placeholder="Current Password"
                    secureTextEntry={textType}
                    textContentType="password"
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
                    buttonWidth="70%"
                    style={styles.button2}
                    name="account-heart-outline"
                    size={15}
                    color={Color.tertiary}
                    fontSize={14}
                    animation="fadeIn"
                    textType="bold"
                    text="Update my password"
                  />
                </AppForm>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {textForPass && changeSuccess ? (
                    <CustomText type="light" style={styles.text3}>
                      Cool! You changed your password!
                    </CustomText>
                  ) : null}
                  {textForPass && !changeSuccess && !err && (
                    <CustomText type="light" style={styles.text4}>
                      Sorry! That didn't work! Please check your connection and
                      your passwords and try again!
                    </CustomText>
                  )}
                  <CustomButton
                    buttonWidth="40%"
                    name="close"
                    size={15}
                    color="cyan"
                    fontSize={14}
                    textType="bold"
                    text="Close"
                    onPress={handleClosePassword}
                  />
                </View>
              </View>
            </CustomLayout>
          )}
        </Modal>
      ) : null}
    </CustomLayout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      cleanUserErrors,
      userGetStart,
      startUpdateMe,
      startPasswordChange
    },
    dispatch
  );

const mapStateToProps = ({ user, textType }: any) => ({
  user: user.user,
  err: user.err,
  isLoadingUpd: user.isLoadingUpdate,
  isLoadingPass: user.isLoadingPass,
  changeSuccess: user.changeSuccess,
  textType: textType.textType
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
