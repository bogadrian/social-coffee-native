import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { URL } from '../../constants/variables';

import FormData from 'form-data';

export const makeCallToServerWithUserData = async (userData: any) => {
  const token = await SecureStore.getItemAsync('jwt');

  const { description, images, name } = userData.userData;

  try {
    let form: any = new FormData();
    images.forEach((img: any) => {
      let localUri = img;

      let filename = localUri.split('/').pop();

      let match: any = /\.(\w+)$.exec(filename)/;

      let type: any = match ? `image/${match}` : 'image';
      form.append('photo', { uri: localUri, name: filename, type });
    });
    form.append('name', name);
    form.append('description', description);

    const userUpdated = await axios.patch(
      `${URL}/api/v1/users/updateMe`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

    return userUpdated.data.data.user;
  } catch (err) {
    console.log(err);
  }
};

export const makeCallToServerWithActivityData = async (userData: any) => {
  const token = await SecureStore.getItemAsync('jwt');

  const { description, images, name, vat, address } = userData.userData;
  console.log('imagesssssdddddcdcswdcsws', userData.userData);

  try {
    let form: any = new FormData();
    images.forEach((img: any) => {
      let localUri = img;

      let filename = localUri.split('/').pop();

      let match: any = /\.(\w+)$.exec(filename)/;

      let type: any = match ? `image/${match}` : 'image';
      form.append('images', { uri: localUri, name: filename, type });
    });

    form.append('name', name);
    form.append('description', description);
    form.append('vat', vat);
    form.append('address', address);

    console.log('fooooorrrmm', form);

    const userUpdated = await axios.patch(
      `${URL}/api/v1/provider/updateMe`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

    return userUpdated.data.data.user;
  } catch (err) {
    console.log(err);
  }
};
