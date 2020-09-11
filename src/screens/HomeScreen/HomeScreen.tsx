import React, {useState} from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet, ActivityIndicator} from 'react-native';
import {AppLoading} from 'expo'

import  { connect } from 'react-redux';

export const { width, height } = Dimensions.get('window');

import Color from '../../constants/Color'


import CustomLayout from '../../custom/CustomLayout';
import HomeNonAuth from './components/HomeNonAuth'

interface Props {  
  navigation: any,
  user: any
}

const HomeScreen: React.FC<Props> = ({navigation, user}) => {
  
  
  if (user && user.emailConfirm === false) {
    return (<CustomLayout style={styles.layout}>
      <View>
        <Text style={styles.text}>
          <Text>Hi </Text>
          <Text style={{color: Color.tertiary}}> {user.name}!</Text> 
          <Text> Please confirm your email before using this app!</Text>
          </Text>
        </View> 
        </CustomLayout>)
  }
  if (user) {
    navigation.navigate('Settings')  
  }
  
  return (   
    <CustomLayout>
      <ScrollView>
      {!user && <HomeNonAuth /> }
    </ScrollView>  
    </CustomLayout>
  );
};

const styles = StyleSheet.create({
  layout: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', height },
  text: { 
    fontSize: 20, 
    color: 'white',
    width: width * 0.80,
    textAlign: 'center',
  }
});

const mapStateToProps = ({user}: any) => ({
  user: user.user
})


export default connect(mapStateToProps)(HomeScreen);
