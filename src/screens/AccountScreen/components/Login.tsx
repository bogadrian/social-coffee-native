import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView} from "react-native";
import * as Yup from "yup";


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
    
  return (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
    <View style={styles.container}>
        <CustomText type="extra-bold-italic" style={styles.text} >
    Please Login or: 
    </CustomText>
    <CustomButton  buttonWidth='60%' style={styles.button2} name="ios-person-add" size={15} color='white' fontSize={14} animation="pulse" textType="bold" text="Switch To Signup" onPress={() => console.log('pressed')}/>
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
         <SubmitButton buttonWidth='40%' style={styles.button1} name="ios-person-add" size={15} color='white' fontSize={14} animation="fadeIn" textType="bold" text="Press" />
         </AppForm>
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
    justifyContent: 'center', alignItems: 'center' 
  }, button1: {
      marginTop: 10,
      justifyContent: 'flex-end', alignItems: 'flex-end'
  }, button2: {
      marginTop: -30,
      marginBottom: 30
  },
  text: {
      fontSize: 20, marginBottom: 40
  }
 
});

export default Login;