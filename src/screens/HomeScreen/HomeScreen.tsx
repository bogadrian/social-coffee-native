import React from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator} from 'react-native';

import  { connect } from 'react-redux';

export const { width, height } = Dimensions.get('window');

import Color from '../../constants/Color'


import CustomLayout from '../../custom/CustomLayout';
import HomeLoading from './components/HomeLoading'

interface Props {  
  user: any;
  isLoading: boolean;
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ user, isLoading }) => {

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
           {!isLoading ? <HomeLoading user={user} /> : <ActivityIndicator size="large" /> }
         </CustomLayout>
    )
};

const styles = StyleSheet.create({
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center', height },
  text: { 
    fontSize: 20, 
    color: 'white',
    width: width * 0.80,
    textAlign: 'center',
  }
});

const mapStateToProps = ({user}: any) => ({
  user: user.user,
  isLoading: user.isLoading
})


export default connect(mapStateToProps)(HomeScreen);
