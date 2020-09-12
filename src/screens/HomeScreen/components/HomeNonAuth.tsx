import React from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
export const { width, height } = Dimensions.get('window');

import { useNavigation } from '@react-navigation/native';

import playSound from '../../../customHooks/sound'

import Logo from '../../../assets/coffee.svg'

import CustomTextAnimated from '../../../custom/CustomTextAnimated';
import CustomButton from '../../../custom/CustomButton';
import CustomText from '../../../custom/CustomText';
import Divider from '../../../custom/Divider';
import CustomLayout from '../../../custom/CustomLayout';



interface Props {
 
}

const HomeNonAuth: React.FC<Props> = () => {
 
  const navigation = useNavigation();
  

   const handleUserLogin = () => {
      playSound()
       navigation.navigate('Account', {screen: 'Account'})
    }
    
    
    const handleUserSignup = () => { 
      playSound()
     navigation.navigate('Account', {screen: 'Signup'})
    }
  
  const appInfo = () => {
      playSound()
       navigation.navigate('Info', {screen: 'InfoScreen'})   
   }
  
  return (   
    
      <CustomLayout style={styles.container}>
         <Logo
      width="60"
      height="60"
    />
          <CustomText type="extra-bold-italic" style={styles.text} >
          Welcome!
          </CustomText>
          <CustomText type="black" style={styles.subtitle}>
            To The Social Coffee App
          </CustomText>
          <CustomText type="semibold" style={styles.thirdText}>
          A Coffee Adicted People's App
          </CustomText>
          <Divider />
          <CustomText type="light" style={styles.forthText}>
          Search for a Coffee Provider
          </CustomText>
          <View style={styles.buttonContainer}>
          <CustomButton  name="search-web" buttonWidth='70%'  size={18} color='coral' fontSize={14} textType="regular" text="Search a Coffee Provider" onPress={handleUserLogin}/>
          </View> 
          <Divider style={styles.secondDivider}/>
          <CustomText type="light" style={styles.forthText}>
          Login or Signup
          </CustomText>
          <View style={styles.buttonContainer}>
          <CustomButton  buttonWidth='30%' name="account-heart-outline" size={18} color='#66ff33' fontSize={12} textType="bold" text="Login" onPress={handleUserLogin}/>
          <CustomButton  buttonWidth='30%' name="account-heart-outline" size={18} color='cyan' fontSize={12} textType="bold" text="Signup" onPress={handleUserSignup}/>
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
          <CustomButton  buttonWidth='50%' name="coffee-outline" size={20} color='coral' fontSize={20} animation="flash" textType="bold" text="Donate" onPress={handleUserLogin}/>
      
          <Divider style={styles.secondDivider} /> 
          <CustomText type="light" style={styles.forthText}>
                How does this app work?
          </CustomText> 
          <CustomButton  buttonWidth='50%' name="information-outline" size={18} color='white' fontSize={14} textType="bold" text="App Info" onPress={appInfo}/> 
        </CustomLayout>
       
  );
};

const styles = StyleSheet.create({
  container: {
   justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 0,
    marginBottom: 50,
    height, 
    width
  }, 
  logo: {width: 100, height: 100},
  text: {
    color: 'white', 
    fontSize: 14, 
    marginTop: 10,
  }, 
  subtitle: {fontSize: 14, marginTop: 10, color: 'white'},
  thirdText: {fontSize: 14, marginTop: 10, margin: 20},
  forthText: {fontSize: 14, marginTop: 10, margin: 10, textAlign: 'center'}, buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondDivider: {marginTop: 20},
  textAnimatedSecond: {fontSize: 20, color: 'coral'}
});

  export default HomeNonAuth
