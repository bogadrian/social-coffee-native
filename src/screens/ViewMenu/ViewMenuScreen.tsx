import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, ActivityIndicator } from 'react-native';

import axios from 'axios';
export const { width, height } = Dimensions.get('window');

import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';

import { URL } from '../../constants/variables';

import CustomLayout from '../../custom/CustomLayout';
import CustomButton from '../../custom/CustomButton';

import Color from '../../constants/Color';

import { IProvider } from '../../types/user.types';

import PDFReader from 'rn-pdf-reader-js';

const defaultMenuPdf =
  'https://social-coffee-app.s3.eu-west-3.amazonaws.com/SeafoodRestaurentMenu.pdf-user-5f74ab9e75d83c404c5c9cd3-1601631116018.pdf';

interface Props {
  user: IProvider;
}
const styles = StyleSheet.create({
  layout: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 80,
    height: height * 1.1,
    width
  }
});

const ViewMenuScreen: React.FC<Props> = ({ user }) => {
  const navigation = useNavigation();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    let run: boolean = true;
    const fetchPdf = async () => {
      try {
        const response = await axios.get(
          `${URL}/api/v1/provider/appViewer/${user.menuUrl}`,
          {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'inline'
            }
          }
        );

        if (run) {
          setUrl(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPdf();

    return () => {
      run = false;
    };
  }, []);

  let urlUri: string;
  if (url !== undefined) {
    urlUri = url;
  } else {
    urlUri = defaultMenuPdf;
  }

  return (
    <React.Fragment>
      {url ? (
        <CustomLayout style={styles.layout}>
          <CustomButton
            buttonWidth="30%"
            name="close"
            size={28}
            color={Color.secondary}
            fontSize={12}
            textType="bold"
            text="Close"
            onPress={() => navigation.navigate('Home')}
          />
          <PDFReader
            source={{ uri: urlUri }}
            style={{
              width,
              height,
              backgroundColor: '#fff'
            }}
          />
        </CustomLayout>
      ) : (
        <CustomLayout style={styles.layout}>
          <ActivityIndicator size="large" />
        </CustomLayout>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ user }: any) => ({
  user: user.user
});

export default connect(mapStateToProps)(ViewMenuScreen);
