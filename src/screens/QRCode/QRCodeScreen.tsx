import React, { useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import { connect } from 'react-redux';

import CustomLayout from '../../custom/CustomLayout';

import UploadPdf from './components/UploadPdf';
import GenerateQr from './components/GenerateQr';

export const { width, height } = Dimensions.get('window');

import { IProvider } from '../../types/user.types';

interface Props {
  type?: string;
  user: IProvider;
}

const styles = StyleSheet.create({
  layout: {
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
  const [menuBoolean, setMenuBoolean] = useState<boolean>(
    user ? !!user.menuUrl : false
  );
  const closeGenerator = () => {
    setMenuBoolean(true);
  };

  return (
    <CustomLayout style={styles.layout}>
      {!menuBoolean ? (
        <GenerateQr closeGenerator={closeGenerator} />
      ) : (
        <View>
          <UploadPdf setMenu={() => setMenuBoolean(false)} />
        </View>
      )}
    </CustomLayout>
  );
};
const mapStateToProps = ({ user }: any) => ({
  user: user.user
});

export default connect(mapStateToProps)(QRcodeScreen);
