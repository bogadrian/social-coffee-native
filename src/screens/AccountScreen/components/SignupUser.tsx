import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView} from "react-native";
import * as Yup from "yup";
import { useNavigation } from '@react-navigation/native';

import Color from '../../../constants/Color';

import CustomText from "../../../custom/CustomText";
import { AppForm, AppFormField} from "../../../components/forms";
import SubmitButton from '../../../components/forms/SubmitButton'
import CustomButton from '../../../custom/CustomButton'
import CustomLayout from '../../../custom/CustomLayout'

interface Props {}

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label('Name'),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').label('Confirm Password')
});

const SignupUser: React.FC<Props> = (props) => { 
  const navigation = useNavigation();
  
  return (
  <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
 
    <CustomLayout >
    <View style={styles.container}>
        <CustomText type="extra-bold-italic" style={styles.text} >
    Signup User: 
       </CustomText>
    <CustomButton  name="electric-switch" buttonWidth='80%' style={styles.button1}  size={15} color='white' fontSize={12} animation="pulse" textType="bold" text="Switch To Signup Coffee Provider" onPress={() => navigation.navigate('SignupProvider')}/>
      <AppForm
        initialValues={{ name: "", email: "", password: "", confirmPassword:"" }}
        onSubmit={(values) => console.log(values)}
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
          name="confirmPassword"
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
    flexGrow: 1,
    height: '100%',
    padding: 10,
    marginTop: 20,
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
 
 
});

export default SignupUser;