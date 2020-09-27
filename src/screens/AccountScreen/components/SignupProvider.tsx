import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export const { width, height } = Dimensions.get('window');

import { connect } from 'react-redux';

import SwiperFlatList from 'react-native-swiper-flatlist';

import Color from '../../../constants/Color';
import CustomButton from '../../../custom/CustomButton';

import { IUserType } from '../../../types/user.types';

interface Props {
  user: IUserType;
  err: Error;
}

import Localization from './Localization';
import FormInfo from './FormInfo';
import CustomLayout from '../../../custom/CustomLayout';

const SignupProvider: React.FC<Props> = ({ user }) => {
  const navigation = useNavigation();

  if (
    (user && user.role === 'user') ||
    (user && user.role === 'coffee-provider')
  ) {
    return (
      <CustomLayout style={styles.layout}>
        <Text style={styles.textLoogedIn}>You are allready logged in! </Text>
        {navigation.navigate('Settings')}
        <CustomButton
          buttonWidth="50%"
          name="account-heart-outline"
          size={15}
          color="yellow"
          fontSize={14}
          animation="tada"
          textType="bold"
          text="My Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </CustomLayout>
    );
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
      <View style={styles.child}>
        <FormInfo />
      </View>
    </SwiperFlatList>
  );
};

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
  },
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center', height },
  textLoogedIn: {
    fontSize: 20,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 20
  }
});

const mapStateToProps = ({ user }: any) => ({
  user: user.user
});

export default connect(mapStateToProps)(SignupProvider);
