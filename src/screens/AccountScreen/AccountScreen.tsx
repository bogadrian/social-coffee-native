import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export const { width, height } = Dimensions.get('window');

import Login from './components/Login';
import AuthScreen from '../AuthScreen/AuthScreen';
import CustomLayout from '../../custom/CustomLayout';
import CustomText from '../../custom/CustomText';

interface Props {
  user: any;
  error: any;
}
const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height
  },
  text: {
    fontSize: 16,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 20
  }
});

const AccountScreen: React.FC<Props> = ({ user, error }) => {
  if (error) {
    return (
      <CustomLayout style={styles.layout}>
        <CustomText type="light" style={styles.text}>
          {error.message}
        </CustomText>
      </CustomLayout>
    );
  }
  return <React.Fragment>{user ? <AuthScreen /> : <Login />}</React.Fragment>;
};

const mapStateToProps = ({ user }: any) => ({
  user: user.user,
  error: user.error
});

export default connect(mapStateToProps)(AccountScreen);
