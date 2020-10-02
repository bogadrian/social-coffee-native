import React from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View } from 'react-native';

import * as DocumentPicker from 'expo-document-picker';

import CustomText from '../../../custom/CustomText';
import CustomLayout from '../../../custom/CustomLayout';
import CustomButton from '../../../custom/CustomButton';

import { useNavigation } from '@react-navigation/native';

import Color from '../../../constants/Color';

export const { width, height } = Dimensions.get('window');

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { startUpload } from '../../../redux/user/updateMe/update.actions';

interface Props {
  startUpload: (pdf: any) => AnyAction;
  setMenu: () => void;
  isLoading: boolean;
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
  },
  text1: {
    fontSize: 20,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 30
  }
});

const UploadPdf: React.FC<Props> = ({ startUpload, setMenu, isLoading }) => {
  const navigation = useNavigation();

  const pickDocument = async () => {
    try {
      let pdf: any = await DocumentPicker.getDocumentAsync();
      startUpload(pdf);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <CustomLayout style={styles.layout}>
        <CustomText type="extra-bold" style={styles.text1}>
          Uploading Menu ...
        </CustomText>
        <ActivityIndicator size="large" />
      </CustomLayout>
    );
  }

  return (
    <CustomLayout style={styles.layout}>
      <View style={styles.layout}>
        <CustomText type="extra-bold" style={styles.text}>
          Upload a Menu! Only Pdf file allowed!
        </CustomText>
        <CustomButton
          buttonWidth="80%"
          style={{ marginTop: 30 }}
          name="account-heart-outline"
          size={18}
          color="cyan"
          fontSize={12}
          textType="bold"
          text="Select PDF"
          onPress={pickDocument}
        />
        <CustomButton
          buttonWidth="60%"
          style={{ marginTop: 80 }}
          name="close"
          size={18}
          color={Color.secondary}
          fontSize={12}
          textType="bold"
          text="Go To QR Code Page"
          onPress={setMenu}
        />

        <CustomButton
          buttonWidth="60%"
          style={{ marginTop: 20 }}
          name="backspace-outline"
          size={18}
          color={Color.tertiary}
          fontSize={12}
          textType="bold"
          text="Back To Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </CustomLayout>
  );
};

const mapStateToProps = ({ user }: any) => ({
  isLoading: user.isLoadingPdf
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      startUpload
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UploadPdf);
