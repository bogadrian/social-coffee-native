import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Dimensions} from "react-native";
import * as Yup from "yup";
import { useNavigation } from '@react-navigation/native';
export const { width, height } = Dimensions.get('window');

import Color from '../../../constants/Color';

import { AppForm, AppFormField} from "../../../components/forms";
import FormImagePicker from '../../../components/ImageList/FormImagePicker'


import SubmitButton from '../../../components/forms/SubmitButton'
import CustomButton from '../../../custom/CustomButton'
import CustomLayout from '../../../custom/CustomLayout'
import CustomText from "../../../custom/CustomText";
import { ScrollView } from "react-native-gesture-handler";

interface Props {}

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label('Activity Name'),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').label('Confirm Password'),
  address: Yup.string().required().label('Activity Address'),
  vat: Yup.string().required().label('Activity Vat Number'),
  images: Yup.array().min(1, "Pleaseselect at least 1 image")
});

const SignupProvider: React.FC<Props> = () => { 
  const navigation = useNavigation();
  
  return (
    <ScrollView contentContainerStyle={{ flex: 1, height, width, marginBottom: 60}}>
  <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
    <CustomLayout >
    <View style={styles.container}>
  <View style={styles.header}>
        <CustomText type="extra-bold-italic" style={styles.text} >
    Signup Coffee Provider: 
       </CustomText>
    <CustomButton  name="electric-switch" buttonWidth='70%' style={styles.button1}  size={15} color='white' fontSize={12} animation="pulse" textType="bold" text="Switch To Signup User" onPress={() => navigation.navigate('SignupUser')}/>
    </View>
      <AppForm
        initialValues={{ 
          name: "", 
          email: "", 
          password: "", 
          confirmPassword:"", 
          address: "", 
          vat: "",
          images: []
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      > 
      <CustomText type="thin-italic" style={styles.text1} >
      Please chose at least 1 photo, up to 10 photos!
         </CustomText>
      <FormImagePicker name="images" />
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
         <SubmitButton buttonWidth='40%' style={styles.button2} name="account-heart-outline" size={15} color={Color.tertiary} fontSize={14} animation="fadeIn" textType="bold" text="Signup" />
         </AppForm>
         </View>
    </CustomLayout>
    </TouchableWithoutFeedback>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20
  },header: {
    alignItems: 'center',
    justifyContent: 'center'
  }, text: {
      fontSize: 20, 
      marginTop: 20,
      marginBottom: 20
  }, text1: {
    fontSize: 14, 
    textAlign: 'center',
  }, button1: {
      marginTop: 10,
      marginBottom: 20
  }, button2: {
      marginTop: 10,
      marginBottom: 50,
      alignSelf: 'center'
  },
});

export default SignupProvider;