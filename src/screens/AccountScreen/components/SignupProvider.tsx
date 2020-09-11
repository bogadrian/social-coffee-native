import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import  { connect } from 'react-redux';

import SwiperFlatList from 'react-native-swiper-flatlist';

import Color from '../../../constants/Color'

interface Props {
  user: any
}

import Localization from './Localization'
import FormInfo from './FormInfo'

const SignupProvider: React.FC<Props> = ({user}) => {
  const navigation = useNavigation();
  
  if (user && user.role === 'coffee-provider') {
    navigation.navigate('Settings')
  }
    return (
        <SwiperFlatList
          showPagination
          paginationActiveColor="red"
          paginationDefaultColor="white"
          
        >
          <View style={styles.child}>
            <Localization />  
          </View>
          <View style={styles.child }>
            <FormInfo />  
          </View>
        </SwiperFlatList>
    );
  }


export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  child: {
    flexGrow: 1,
    height: height * 0.94,
    width,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Color.backGroundPrimary
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  }
});

const mapStateToProps = ({user}: any) => ({
  user: user.user
})

export default connect(mapStateToProps)(SignupProvider)


