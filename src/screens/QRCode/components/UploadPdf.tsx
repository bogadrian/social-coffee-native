import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import CustomText from '../../../custom/CustomText';
import CustomLayout from '../../../custom/CustomLayout';
export const { width, height } = Dimensions.get('window');

interface Props {
  type?: string;
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

const UploadPdf: React.FC<Props> = () => {
  return (
    <CustomLayout style={styles.layout}>
      <CustomText type="extra-bold" style={styles.text}>
        Upload Pdf
      </CustomText>
    </CustomLayout>
  );
};

export default UploadPdf;
