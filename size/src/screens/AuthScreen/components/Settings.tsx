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

  const handleClick = async () => {
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

  return (
    <CustomLayout style={styles.layout}>
      <Text style={styles.text}>
        The Settings Here. implemnet update me, my blocked ppl, delete, logout.
        my comunities no, that has its own screen.
      </Text>
      <CustomButton
        buttonWidth="30%"
        name="account-heart-outline"
        size={15}
        color="white"
        fontSize={14}
        animation="fadeIn"
        textType="bold"
        text="Logout"
        onPress={() => handleClick()}
      />
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

export default connect(null, mapDispatchToProps)(Settings);
