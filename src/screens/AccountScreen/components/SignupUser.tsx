import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text, Keyboard, Dimensions} from "react-native";
import * as Yup from "yup";
import { useNavigation } from '@react-navigation/native';
export const { width, height } = Dimensions.get('window');

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import  { connect } from 'react-redux';
import {signupStartUser} from '../../../redux/user/signup/signup.actions'

import Color from '../../../constants/Color';

import CustomText from "../../../custom/CustomText";
import { AppForm, AppFormField} from "../../../components/forms";
import SubmitButton from '../../../components/forms/SubmitButton'
import CustomButton from '../../../custom/CustomButton'
import CustomLayout from '../../../custom/CustomLayout'

interface Props {
  signupStartUser: any, 
  user: any
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label('Name'),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null!], 'Passwords must match').label('Confirm Password')
});

const SignupUser: React.FC<Props> = ({signupStartUser, user}) => { 
  const navigation = useNavigation();
  
  if ((user && user.role === 'user') || (user && user.role === 'coffee-provider')) {
    return <CustomLayout style={styles.layout}><Text style={styles.textLoogedIn}>You are allready logged in! </Text>
      {navigation.navigate('Settings')}
    <CustomButton buttonWidth='50%' name="account-heart-outline" size={15} color='yellow' fontSize={14} animation="tada" textType="bold" text="My Settings" onPress={() => navigation.navigate('Settings')}/>
    </CustomLayout>
  }
  
  const signupUserHandler = (values: any) => {
    signupStartUser(values)
  }
  
  return (
  <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
 
    <CustomLayout >
    <View style={styles.container}>
        <CustomText type="extra-bold-italic" style={styles.text} >
    Signup User: 
       </CustomText>
    <CustomButton  name="electric-switch" buttonWidth='80%' style={styles.button1}  size={15} color='white' fontSize={12} animation="pulse" textType="bold" text="Switch To Signup Coffee Provider" onPress={() => navigation.navigate('SignupProvider')}/>
      <AppForm
        initialValues={{ name: "", email: "", password: "", passwordConfirm:"" }}
        onSubmit={(values) => signupUserHandler(values)}
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
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="passwordConfirm"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
        />
         <SubmitButton buttonWidth='40%' style={styles.button2} name="account-heart-outline" size={15} color={Color.tertiary} fontSize={14} animation="fadeIn" textType="bold" text="Signup" />
         </AppForm>
         </View>
    </CustomLayout>
 
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    padding: 10,
    marginTop: 20,
    marginBottom: 180,
    justifyContent: 'center', 
    alignItems: 'center' 
  }, text: {
      fontSize: 30, marginTop: 20
  }, button1: {
      marginTop: 10,
      marginBottom: 20
  }, button2: {
      marginTop: 30,
      marginBottom: 80
  },
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center', height },
  textLoogedIn: { 
    fontSize: 20, 
    color: 'white',
    width: width * 0.80,
    textAlign: 'center',
    marginBottom: 20
  }
 
 
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
bindActionCreators(
  {
    signupStartUser
  },
  dispatch,
);

const mapStateToProps = ({user}: any) => ({
  user: user.user
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupUser)
