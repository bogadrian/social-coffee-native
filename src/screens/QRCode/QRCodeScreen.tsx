import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';

//import CustomText from '../../custom/CustomText';
import CustomLayout from '../../custom/CustomLayout';
//import CustomButton from '../../custom/CustomButton';
//import Divider from '../../custom/Divider';

import UploadPdf from './components/UploadPdf';
import GenerateQr from './components/GenerateQr';

export const { width, height } = Dimensions.get('window');

import { IUserType } from '../../types/user.types';

interface Props {
  type?: string;
  user: IUserType;
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

const QRcodeScreen: React.FC<Props> = ({ user }) => {
  const myQrImage = 'default menu url';
  console.log(user);
  return (
    <CustomLayout style={styles.layout}>
      {myQrImage !== 'default menu url' ? <UploadPdf /> : <GenerateQr />}
    </CustomLayout>
  );
};
const mapStateToProps = ({ user }: any) => ({
  user: user.user,
  isLoading: user.isLoading
});

export default connect(mapStateToProps)(QRcodeScreen);
