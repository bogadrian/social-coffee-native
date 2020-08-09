import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions} from "react-native";
import * as Yup from "yup";
import { useNavigation } from '@react-navigation/native';
export const { width, height } = Dimensions.get('window');

import Color from '../../../constants/Color';

import CustomText from "../../../custom/CustomText";
import { AppForm, AppFormField} from "../../../components/forms";
import SubmitButton from '../../../components/forms/SubmitButton'
import CustomButton from '../../../custom/CustomButton'

interface Props {}

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const Login: React.FC<Props> = (props) => { 
  const navigation = useNavigation();
  
  return (
  <View style={styles.container}>
  <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
    
    <View style={styles.content}>
        <CustomText type="extra-bold-italic" style={styles.text} >
    Please Login or: 
    </CustomText>
    
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
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
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
         <SubmitButton buttonWidth='40%' style={styles.button1} name="ios-person-add" size={15} color={Color.tertiary} fontSize={14} animation="fadeIn" textType="bold" text="Login" />
         <CustomButton  buttonWidth='60%' style={styles.button2} name="ios-person-add" size={15} color='white' fontSize={14} animation="pulse" textType="bold" text="Switch To Signup" onPress={() => navigation.navigate('Signup')}/>
         </AppForm>
    </View>
 
    </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height,
    flexGrow:1,
    padding: 10,
    marginTop: 20,
     
  },content: {
    justifyContent: 'center', 
    alignItems: 'center'
  }, button1: {
      marginTop: 30,
      justifyContent: 'flex-end', alignItems: 'flex-end'
  }, button2: {
      marginTop: 40,
      marginBottom: 30
  },
  text: {
      fontSize: 30, marginBottom: 40
  }
 
});

export default Login;