import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');

import { connect } from 'react-redux';

import CustomLayout from '../../../custom/CustomLayout';
import CustomText from '../../../custom/CustomText';

import UpdateUser from './user/updateUser';
import UpdateProvider from './provider/updateProvider';

import { IUserType } from '../../../types/user.types';

interface Props {
  user: IUserType;
  error: Error;
}

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height
  },
  text: {
    fontSize: 20,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center'
  }
});

const Settings: React.FC<Props> = ({ user, error }) => {
  if (user.role === 'user') {
    return <UpdateUser />;
  }

  if (user.role === 'coffee-provider') {
    return <UpdateProvider />;
  }

  if (error && !user) {
    return (
      <CustomLayout style={styles.layout}>
        <CustomText type="light" style={styles.text}>
          {error.message}
        </CustomText>
      </CustomLayout>
    );
  }

  return (
    <CustomLayout style={styles.layout}>
      <CustomText type="light" style={styles.text}>
        Please login
      </CustomText>
    </CustomLayout>
  );
};

const mapStateToProps = ({ user }: any) => ({
  user: user.user,
  error: user.error
});

export default connect(mapStateToProps)(Settings);
