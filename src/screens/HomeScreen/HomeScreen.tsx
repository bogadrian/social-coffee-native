import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';

import * as Linking from 'expo-linking';

export const { width, height } = Dimensions.get('window');

import Color from '../../constants/Color';

import { userGetStart } from '../../redux/user/getMe/users.actions';

//import CustomLayout from '../../custom/CustomLayout';
import HomeNonAuth from './components/HomeNonAuth';
import AuthScreen from '../AuthScreen/AuthScreen';

import { IUserType } from '../../types/user.types';

interface Props {
  user: IUserType;
  isLoading: boolean;
  navigation?: any;
  userGetStart?: () => AnyAction;
}

const HomeScreen: React.FC<Props> = ({ user, navigation }) => {
  const [route, setRoute] = useState<string | undefined>();
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    let run: boolean = true;

    Linking.getInitialURL().then((url: any) => extractToken(url));
    Linking.addEventListener('url', ({ url }) => extractToken(url));

    const extractToken = (url: string) => {
      if (url) {
        const { path } = Linking.parse(url);

        if (path) {
          const rou = (path as any).split('=')[0];
          const tok = (path as any).split('=')[1];
          if (run) {
            setRoute(rou);
            setToken(tok);
          }
        }
      }
    };

    return () => {
      run = false;
    };
  }, []);

  console.log('route', route, token);
  if (route === '/reset/token') {
    navigation.navigate('Reset', { screen: 'Reset', params: { token } });
  }

  if (route === '/confirmation') {
    navigation.navigate('Confirm Email');
  }

  if (user && user.emailConfirm === false) {
    return (
      <View style={styles.layout}>
        <View>
          <Text style={styles.text}>
            <Text>Hi </Text>
            <Text style={{ color: Color.tertiary }}> {user.name}!</Text>
            <Text> Please confirm your email before using this app!</Text>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.layout}>
      {!user ? <HomeNonAuth /> : <AuthScreen />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  layout: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 1.6
  },
  text: {
    fontSize: 20,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center'
  }
});

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  isLoading: state.user.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      userGetStart
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
