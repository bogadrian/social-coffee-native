// build a render marker points screen here
// build a find communities within button on home page non protected, open to all. send a fetch request to &geoWithgin when cliked. get lat and long from location (use geo location as in DraggbelMarker) or on search.
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal
} from 'react-native';

import * as Yup from 'yup';
import axios from 'axios';
import { URL } from '../../../constants/variables';

export const { width, height } = Dimensions.get('window');

import Color from '../../../constants/Color';
import CustomButton from '../../../custom/CustomButton';

import { AppForm, AppFormField } from '../../../components/forms';
import SubmitButton from '../../../components/forms/SubmitButton';

import CustomLayout from '../../../custom/CustomLayout';
import CustomText from '../../../custom/CustomText';
import CommunitiesMap from '../../../custom/CommunitiesMap';

const validationSchema = Yup.object().shape({
  city: Yup.string().label('Address')
});

export interface ILocation {
  latitude: number;
  longitude: number;
}

const CommunityMapScreen: React.FC = () => {
  const [coord, setCoordinates] = useState<ILocation>();
  const [open, setOpenModal] = useState<boolean>(false);

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

  const openModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const handleSetCoords = (values: any) => {
    setCoords(values);
    setOpenModal(false);
  };
  return (
    <ScrollView contentContainerStyle={styles.layout}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <CustomLayout>
          <CustomButton
            buttonWidth="70%"
            name="search-web"
            size={18}
            style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 }}
            color="white"
            fontSize={18}
            textType="bold"
            text="Search On The Map"
            onPress={openModal}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={open}
            onRequestClose={() => {
              console.log('modal closed');
            }}
          >
            <CustomLayout style={styles.layout}>
              <CustomText type="bold" style={styles.title}>
                Search a Provider on the Map
              </CustomText>
              <View style={styles.subtitleContainer}>
                <CustomText type="thin-italic" style={styles.subtitle}>
                  Pleae write a city, a street or any address!
                </CustomText>
              </View>

              <View style={styles.form}>
                <AppForm
                  initialValues={{ city: '' }}
                  onSubmit={values => handleSetCoords(values)}
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
                    buttonWidth="60%"
                    style={styles.button}
                    size={18}
                    color={Color.tertiary}
                    fontSize={20}
                    animation="fadeIn"
                    textType="bold"
                    text="Find on Maps"
                  />
                </AppForm>
              </View>
              <CustomButton
                buttonWidth="50%"
                name="close"
                size={18}
                style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
                color="white"
                fontSize={20}
                textType="bold"
                text="Close"
                onPress={closeModal}
              />
            </CustomLayout>
          </Modal>
          <View style={{ position: 'relative' }}>
            <CommunitiesMap reg={coord} />
          </View>
        </CustomLayout>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  layout: {
    width,
    height,
    justifyContent: 'center'
  },
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
    marginTop: 20,
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

export default CommunityMapScreen;
