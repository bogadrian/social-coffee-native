import React from 'react';
import { StyleSheet, View } from 'react-native';

import CustomTextAnimated from '../../../custom/CustomTextAnimated';
import CustomButton from '../../../custom/CustomButton';
import CustomText from '../../../custom/CustomText';
import Divider from '../../../custom/Divider';

interface Props {  
}

const styles = StyleSheet.create({
 
  container: {
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 20
  }, 
  text: {
    color: 'white', 
    fontSize: 20, 
    marginTop: 20,
  }, 
  subtitle: {fontSize: 14, marginTop: 10, color: 'aqua'},
  thirdText: {fontSize: 16, marginTop: 10, margin: 20},
  forthText: {fontSize: 16, marginTop: 10, margin: 10, textAlign: 'center'}, buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondDivider: {marginTop: 20},
  textAnimatedSecond: {fontSize: 20, color: 'aqua'}
});

const HomeAuth: React.FC<Props> = () => {
  return (   
    
      <View style={styles.container}>
        <CustomTextAnimated animation="pulse" type="extra-bold-italic" style={styles.text} >
        Welcome!
        </CustomTextAnimated>
        <CustomText type="black" style={styles.subtitle}>
          To The Social Coffee App
        </CustomText>
        <CustomText type="semibold" style={styles.thirdText}>
        A Coffee Adicted People's App
        </CustomText>
        <Divider />
        <CustomText type="light" style={styles.forthText}>
        In order to search for a Coffee Provider, you can Login or Signup
        </CustomText>
        <View style={styles.buttonContainer}>
        <CustomButton  buttonWidth='30%' name="ios-person-add" size={14} color='fuchsia' fontSize={12}textType="bold" text="Login" onPress={() => console.log('pressed')}/>
        <CustomButton  buttonWidth='30%' name="ios-person-add" size={14} color='yellow' fontSize={12} textType="bold" text="Signup" onPress={() => console.log('pressed')}/>
        </View>
        <CustomText type="light" style={styles.forthText}>
        If you are a Coffee Provider, you can Login or Signup here
        </CustomText>
        <View style={styles.buttonContainer}>
        <CustomButton  buttonWidth='30%' name="ios-person-add" size={14} color='salmon' fontSize={12} textType="bold" text="Login" onPress={() => console.log('pressed')}/>
        <CustomButton  buttonWidth='30%' name="ios-person-add" size={14} color='cyan' fontSize={12} textType="bold" text="Signup" onPress={() => console.log('pressed')}/>
        </View>
        <Divider style={styles.secondDivider}/>
        <CustomTextAnimated animation="pulse" type="extra-bold-italic" style={styles.textAnimatedSecond} >
        You can also ... 
        </CustomTextAnimated>
        <CustomText type="light" style={styles.forthText}>
                Donate a coffee to us. We will 
                forawrad it to one of our 
                verfied coffee provider!
        </CustomText>
        <CustomButton  buttonWidth='50%' name="ios-cafe" size={20} color='orange' fontSize={20} animation="flash" textType="bold" text="Donate" onPress={() => console.log('pressed')}/>
     
      <Divider style={styles.secondDivider} /> 
       <CustomText type="light" style={styles.forthText}>
               How does this app work?
        </CustomText> 
        <CustomButton  buttonWidth='50%' name="ios-cog" size={20} color='white' fontSize={20} textType="bold" text="App Info" onPress={() => console.log('pressed')}/> 
        </View>
    
  );
};


export default HomeAuth;