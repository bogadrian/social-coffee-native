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
  name: Yup.string().required().min(4).label('Activity Name'),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').label('Confirm Password'),
  address: Yup.string().required().label('Activity Address'),
  vat: Yup.string().required().label('Activity Vat Number')
});

const SignupProvider: React.FC<Props> = (props) => { 
  const navigation = useNavigation();
  
  return (
  <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
    <CustomLayout style={styles.custom}>
    <View style={styles.container}>
        <CustomText type="extra-bold-italic" style={styles.text} >
    Signup Coffee Provider: 
       </CustomText>
    <CustomButton  buttonWidth='70%' style={styles.button1}  size={15} color='white' fontSize={12} animation="pulse" textType="bold" text="Switch To Signup User" onPress={() => navigation.navigate('SignupUser')}/>
      <AppForm
        initialValues={{ name: "", email: "", password: "", confirmPassword:"", address: "", vat: ""}}
        onSubmit={(values) => console.log(values)}
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
        <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        icon="email"
        keyboardType="default"
        name="address"
        placeholder="Activity Address"
        textContentType="addressCity"
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
         <SubmitButton buttonWidth='40%' style={styles.button2} name="ios-person-add" size={15} color={Color.tertiary} fontSize={14} animation="fadeIn" textType="bold" text="Signup" />
         </AppForm>
         </View>
    </CustomLayout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  custom: {flexGrow: 1 },
  container: {
    flexGrow: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20
  }, text: {
      fontSize: 20, marginTop: 20
  }, button1: {
      marginTop: 10,
      marginBottom: 20
  }, button2: {
      marginTop: 10,
      marginBottom: 10
  },
});

export default SignupProvider;