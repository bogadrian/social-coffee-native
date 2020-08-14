import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import  { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { openInfo } from '../../../redux/show-info/show-info.actions';
import playSound from '../../../customHooks/sound'

import Logo from '../../../assets/coffee.svg'

import CustomTextAnimated from '../../../custom/CustomTextAnimated';
import CustomButton from '../../../custom/CustomButton';
import CustomText from '../../../custom/CustomText';
import Divider from '../../../custom/Divider';

interface Props {
  openInfo?: any
}

const HomeNonAuth: React.FC<Props> = ({openInfo}) => {
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
      // call opneInfo which change the state in redux for isInfo from false to true 
      openInfo()
       // setTimeout because navigation is called before the boolean info is changed 
      setTimeout(() => {
       navigation.navigate('AppInfo', {screen: 'InfoScreen'})
      }, 100)
     
  }
 
 
  return (   
    
      <View style={styles.container}>
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
          <CustomButton  buttonWidth='60%'  size={14} color='coral' fontSize={14} textType="regular" text="Search a Coffee Provider" onPress={handleUserLogin}/>
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
          <CustomButton  buttonWidth='50%' name="information-outline" size={28} color='white' fontSize={20} textType="bold" text="App Info" onPress={appInfo}/> 
        </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 20
  }, 
  logo: {width: 100, height: 100},
  text: {
    color: 'white', 
    fontSize: 20, 
    marginTop: 20,
  }, 
  subtitle: {fontSize: 18, marginTop: 10, color: 'white'},
  thirdText: {fontSize: 16, marginTop: 10, margin: 20},
  forthText: {fontSize: 20, marginTop: 10, margin: 10, textAlign: 'center'}, buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondDivider: {marginTop: 20},
  textAnimatedSecond: {fontSize: 20, color: 'coral'}
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
     openInfo,
    },
    dispatch,
  );

  export default connect(null, mapDispatchToProps)(HomeNonAuth)
