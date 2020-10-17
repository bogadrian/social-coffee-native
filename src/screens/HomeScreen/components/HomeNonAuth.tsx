import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
export const { width, height } = Dimensions.get('window');

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import playSound from '../../../customHooks/sound';

import Logo from '../../../assets/coffee.svg';

import CustomTextAnimated from '../../../custom/CustomTextAnimated';
//import CustomButton from '../../../custom/CustomButton';
import CustomText from '../../../custom/CustomText';
import Divider from '../../../custom/Divider';
import CustomLayout from '../../../custom/CustomLayout';
import CustomBox from '../../../custom/CustomBox';

import Color from '../../../constants/Color';

import { cleanUserErrors } from '../../../redux/user/reducer.actions';

interface Props {
  cleanUserErrors: () => AnyAction;
}

const HomeNonAuth: React.FC<Props> = ({ cleanUserErrors }) => {
  const navigation = useNavigation();

  const handleUserLogin = () => {
    playSound();
    navigation.navigate('Account', { screen: 'Account' });
    cleanUserErrors();
  };

  const handleUserSignup = () => {
    playSound();
    navigation.navigate('Account', { screen: 'Signup' });
    cleanUserErrors();
  };

  const appInfo = () => {
    playSound();
    navigation.navigate('Info', { screen: 'InfoScreen' });
  };

  return (
    <CustomLayout style={styles.container}>
      <Logo width="60" height="60" />
      <CustomText type="extra-bold-italic" style={styles.text}>
        Welcome!
      </CustomText>
      <CustomText type="black" style={styles.subtitle}>
        To The Social Coffee App
      </CustomText>
      <CustomText type="semibold" style={styles.thirdText}>
        A Coffee Adicted People's App
      </CustomText>
      <Divider />
      <CustomBox
        handleButton1={() =>
          navigation.navigate('My Communities', { map: 'map' })
        }
        buttonSize={20}
        buttonColor1={Color.backGroundPrimary}
        buttonWidth="50%"
        button1="Search"
        name1="search-web"
        headText="Search for a Coffee Provider"
        iconName="search-web"
      />
      {/*<CustomText type="light" style={styles.forthText}>
          Search for a Coffee Provider
        </CustomText>
        <View style={styles.buttonContainer}>
          <CustomButton
            name="search-web"
            buttonWidth="70%"
            size={18}
            color="coral"
            fontSize={14}
            textType="regular"
            text="Search a Coffee Provider"
            onPress={handleUserLogin}
          />
  </View>*/}
      {/*<Divider style={styles.secondDivider} />
        <CustomText type="light" style={styles.forthText}>
          Login or Signup
        </CustomText>
        <View style={styles.buttonContainer}>
          <CustomButton
            buttonWidth="30%"
            name="account-heart-outline"
            size={18}
            color="#66ff33"
            fontSize={12}
            textType="bold"
            text="Login"
            onPress={handleUserLogin}
          />
          <CustomButton
            buttonWidth="30%"
            name="account-heart-outline"
            size={18}
            color="cyan"
            fontSize={12}
            textType="bold"
            text="Signup"
            onPress={handleUserSignup}
          />
</View>*/}
      <Divider />
      <CustomBox
        handleButton1={handleUserLogin}
        handleButton2={handleUserSignup}
        buttonSize={20}
        buttonColor1={Color.backGroundPrimary}
        buttonColor2={Color.primary}
        buttonWidth="30%"
        name1="account-heart-outline"
        name2="account-heart-outline"
        button1="Login"
        button2="Signup"
        headText="Login or Signup"
        backColor1={Color.tertiary}
        backColor2={Color.secondary}
        iconName="account"
      />
      <Divider style={styles.secondDivider} />
      <CustomTextAnimated
        animation="pulse"
        type="extra-bold-italic"
        style={styles.textAnimatedSecond}
      >
        You can also ...
      </CustomTextAnimated>
      {/*<CustomText type="light" style={styles.forthText}>
          Donate a coffee to us. We will forawrad it to one of our verfied
          coffee provider!
        </CustomText>
        <CustomButton
          buttonWidth="50%"
          name="coffee-outline"
          size={20}
          color="coral"
          fontSize={20}
          animation="flash"
          textType="bold"
          text="Donate"
          onPress={handleUserLogin}
/>*/}
      <CustomText type="light" style={styles.forthText}>
        Donate a coffee to us. We will forawrad it to one of our verfied coffee
        provider!
      </CustomText>
      <CustomBox
        handleButton1={handleUserLogin}
        buttonSize={30}
        buttonColor1={Color.primary}
        buttonWidth="70%"
        name1="account-heart-outline"
        button1="Donate"
        headText="Thank You !"
        backColor1={Color.backGroundPrimary}
        iconName="atom-variant"
      />
      <Divider style={styles.secondDivider} />
      <CustomText type="light" style={styles.forthText}>
        How does this app work?
      </CustomText>
      <CustomBox
        handleButton1={appInfo}
        buttonSize={30}
        buttonColor1="cyan"
        buttonWidth="70%"
        name1="information-outline"
        button1="Info"
        headText="App Info"
        backColor1={Color.backGroundPrimary}
        iconName="information-outline"
      />
    </CustomLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height,
    width
  },
  logo: { width: 100, height: 100 },
  text: {
    color: 'white',
    fontSize: 14,
    marginTop: 10
  },
  subtitle: { fontSize: 14, marginTop: 10, color: 'white' },
  thirdText: { fontSize: 14, marginTop: 10, margin: 20 },
  forthText: { fontSize: 14, marginTop: 10, margin: 10, textAlign: 'center' },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondDivider: { marginTop: 20 },
  textAnimatedSecond: { fontSize: 20, color: 'coral' }
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      cleanUserErrors
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(HomeNonAuth);
