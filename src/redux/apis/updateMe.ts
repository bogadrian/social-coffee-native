import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import mime from 'mime';

import { URL } from '../../constants/variables';
import { IUsersTypes } from '../user/users.types';

import FormData from 'form-data';
interface IUpdateValues {
  name: string;
  description: string;
  images: string[];
  u?: string;
  vat?: string;
  address?: string;
}

interface ISagaValues {
  userData: IUpdateValues;
  type: IUsersTypes;
}
export const makeCallToServerWithUserData = async (userData: ISagaValues) => {
  const token = await SecureStore.getItemAsync('jwt');

  const { description, images, name } = userData.userData;

  try {
    let form: any = new FormData();
    images.forEach((img: any) => {
      let localUri = img;
      const newImageUri = 'file:///' + localUri.split('file:/').join('');
      let filename = localUri.split('/').pop();

      const type = mime.getType(newImageUri);
      form.append('photo', { uri: newImageUri, name: filename, type });
    });
    form.append('name', name);
    form.append('description', description);

    const axiosInstance = await axios.create({
      baseURL: `${URL}/api/v1/users/updateMe`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/form-data boundary=${form._boundary}`,
        'Access-Control-Allow-Origin': '*',
        accept: 'application/json'
      }
    });

    const userUpdated = await axiosInstance({
      method: 'PATCH',
      data: form
    });

    return userUpdated.data.data.user;
  } catch (err) {
    console.log(err);
  }
};

export const makeCallToServerWithActivityData = async (
  userData: ISagaValues
) => {
  const token = await SecureStore.getItemAsync('jwt');

  const { description, images, name, vat, address } = userData.userData;

  try {
    let form: any = new FormData();
    images.forEach((img: any) => {
      let localUri = img;
      const newImageUri = 'file:///' + localUri.split('file:/').join('');
      let filename = localUri.split('/').pop();

      const type = mime.getType(newImageUri);
      form.append('images', { uri: newImageUri, name: filename, type });
    });

    form.append('name', name);
    form.append('description', description);
    form.append('vat', vat);
    form.append('address', address);

    console.log('fooooorrrmm', form);

    const axiosInstance = await axios.create({
      baseURL: `${URL}/api/v1/provider/updateMe`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/form-data boundary=${form._boundary}`,
        'Access-Control-Allow-Origin': '*',
        accept: 'application/json'
      }
    });

    const userUpdated = await axiosInstance({
      method: 'PATCH',
      data: form
    });
    if (userUpdated.data.data) {
      return userUpdated.data.data.user;
    }
  } catch (err) {
    console.log(err);
  }
};
export const makeCallToServerPdf = async (pdf: any) => {
  const token = await SecureStore.getItemAsync('jwt');

  try {
    let form: any = new FormData();

    const localUri = pdf.pdf.uri;
    if (localUri) {
      let filename = localUri.split('/').pop();

      let match: any = /\.(\w+)$.exec(filename)/;

      let type: any = match ? `pdf/${match}` : 'pdf';

      form.append('pdf', { uri: localUri, name: filename, type });

      const userUpdated = await axios.patch(
        `${URL}/api/v1/provider/uploadPdf`,
        form,
        {
          headers: {
            Accept: 'application/pdf',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/pdf',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );

      if (userUpdated.data.data) {
        return userUpdated.data.data.user;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
