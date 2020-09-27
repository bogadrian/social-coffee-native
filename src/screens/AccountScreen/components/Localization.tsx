import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as Yup from 'yup';
import axios from 'axios';
import { URL } from '../../../constants/variables';

export const { width, height } = Dimensions.get('window');

import Color from '../../../constants/Color';

import { AppForm, AppFormField } from '../../../components/forms';
import SubmitButton from '../../../components/forms/SubmitButton';

import CustomLayout from '../../../custom/CustomLayout';
import CustomText from '../../../custom/CustomText';
import CustomDragMarker from '../../../custom/CustomDragMarker';

const validationSchema = Yup.object().shape({
  city: Yup.string().label('Address')
});

export interface ILocation {
  latitude: number;
  longitude: number;
}

const Localization: React.FC = () => {
  const [coord, setCoordinates] = useState<ILocation>();

  const setCoords = async (city: string) => {
    try {
      const coordinates = await axios.post(`${URL}/api/v1/geo/address`, {
        data: city
      });

      if (coordinates) {
        const { lat, lng } = coordinates.data.data;
        setCoordinates({ latitude: lat, longitude: lng });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, height: '140%', marginBottom: 140 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <CustomLayout>
          <CustomText type="bold" style={styles.title}>
            Let's find where are you located!
          </CustomText>
          <View style={styles.subtitleContainer}>
            <CustomText type="thin-italic" style={styles.subtitle}>
              Pleae write a city, a street or any address you want and may be
              found on Google Maps!
            </CustomText>
          </View>

          <View style={styles.form}>
            <AppForm
              initialValues={{ city: '' }}
              onSubmit={values => setCoords(values)}
              validationSchema={validationSchema}
            >
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="map-search"
                keyboardType="default"
                name="city"
                placeholder="City ... "
                textContentType="addressCity"
              />

              <SubmitButton
                name="search-web"
                buttonWidth="50%"
                style={styles.button}
                size={18}
                color={Color.secondary}
                fontSize={14}
                animation="fadeIn"
                textType="bold"
                text="Find on Maps"
              />
            </AppForm>
          </View>
          <View style={{ position: 'relative' }}>
            <CustomDragMarker reg={coord} />
          </View>
          <CustomText type="regular" style={styles.textEnd}>
            Please press OK if it is the right address{' '}
          </CustomText>
          <CustomText type="bold" style={styles.swipe}>
            Swipe Left
          </CustomText>
          <View style={{ alignItems: 'center', marginBottom: 120 }}>
            <MaterialCommunityIcons
              name="gesture-swipe"
              size={60}
              color="white"
            />
          </View>
        </CustomLayout>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width
  },
  form: {
    width: '90%',
    alignSelf: 'center'
  },
  title: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16
  },
  subtitleContainer: {
    width: '90%'
  },
  button: {
    marginBottom: 20,
    alignSelf: 'center'
  },
  textEnd: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
    color: Color.secondary
  },
  swipe: {
    marginBottom: 5,
    textAlign: 'center'
  }
});

export default Localization;
