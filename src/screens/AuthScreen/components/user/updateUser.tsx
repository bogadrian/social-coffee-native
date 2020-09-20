import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Modal, TextInput } from 'react-native';

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

interface Props {
  user: any;
  cleanUserErrors: any;
  userGetStart: any;
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
    fontSize: 20,
    padding: 20
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
  button2: {
    marginTop: 30,
    marginBottom: 20,
    alignSelf: 'center'
  }
});

const validationSchemaUpdate = Yup.object().shape({
  name: Yup.string().required().min(4).label('Activity Name'),
  description: Yup.string().required().min(20).label('Description'),
  images: Yup.array().min(1, 'Pleaseselect at least 1 image')
});

const UpdateUser: React.FC<Props> = ({
  user,
  userGetStart,
  cleanUserErrors
}) => {
  const [update, setUpdate] = useState<boolean>(false);
  const navigation = useNavigation();
  console.log('PPPPPPPPPPPPPPPPPPPPPPPPPP', user);

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
    axios
      .get(`${URL}/api/v1/provider/logout`)
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
    console.log('fired');
    setUpdate(true);
  };
  const handleComunities = () => {};
  const handleBlocked = () => {};
  const handleChangePassword = () => {};

  const handleDelete = async () => {
    await axios.delete(`${URL}/api/v1/users/deleteMe`);
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
        If you are part of more comunities, here you can manage them!
      </CustomText>
      <CustomButton
        buttonWidth="80%"
        name="account-heart-outline"
        size={15}
        color={Color.secondary}
        fontSize={14}
        textType="bold"
        text="Manage My Comunities"
        onPress={() => handleComunities()}
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
          <CustomLayout style={styles.layoutModal}>
            <View style={styles.appForm}>
              <AppForm
                initialValues={{
                  name: '',
                  description: '',
                  images: []
                }}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchemaUpdate}
              >
                <CustomText type="light" style={styles.textModal}>
                  Please chose one photo for your profile!
                </CustomText>

                <FormImagePicker name="images" numberPhoto={0} />

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
                  keyboardType="default"
                  name="description"
                  placeholder="Description"
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
                  onPress={() => setUpdate(false)}
                />
              </View>
            </View>
          </CustomLayout>
        </Modal>
      ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
