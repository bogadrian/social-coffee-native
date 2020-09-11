import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
export const { width, height } = Dimensions.get('window');

import  { connect } from 'react-redux';

import CustomLayout from '../../custom/CustomLayout'
import Color from '../../constants/Color'

import NotLogin from './components/NotLogin'
import Settings from './components/Settings'

interface Props {
 user: any
}

const styles = StyleSheet.create({
  layout: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', height },
  text: { 
    fontSize: 20, 
    color: 'white',
    width: width * 0.80,
    textAlign: 'center',
  }
});

const AuthScreen: React.FC<Props> = ({user}) => {
  
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
  return (
    <CustomLayout style={styles.layout}>
      {user ? <Settings user={user}/> : <NotLogin />}
    </CustomLayout>
  );
};


const mapStateToProps = ({user}: any) => ({
  user: user.user
})
export default connect(mapStateToProps)(AuthScreen);
