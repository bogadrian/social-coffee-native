import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { URL } from '../../constants/variables';

export const getUserToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('jwt');

    const user: any = await axios.get(`${URL}/api/v1/users/getMe`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      },
      timeout: 4000
    });

    return user.data.data.user;
  } catch (error) {
    console.log(error.response.data.message), 'ooooooooooooo';
    //throw new Error(error.response.data.message);
  }
};

export const getProviderToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('jwt');

    const provider: any = await axios.get(`${URL}/api/v1/provider/getMe`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      },
      timeout: 4000
    });

    return provider.data.data.user;
  } catch (error) {
    console.log(error.response.data.message, 'eeeeeeeeeeeeee');
    //throw new Error(error.response.data.message);
  }
};
