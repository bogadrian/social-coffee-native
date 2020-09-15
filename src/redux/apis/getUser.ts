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
      }
    });
    console.log('111111111111111', user);
    if (user.emailConfirm === false) {
      console.log('Please confirm your email first!');
    }

    if (user) {
      console.log(user.data.data.user, 'yyyyyyyyyyyyyyyyyyyyy');
      return user.data.data.user;
    }
  } catch (error) {
    console.log(error.response.data.message), 'ooooooooooooo';
    //throw new Error(error.response.data.message);
  }
};

export const getProviderToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('jwt');
    console.log('111111111111111');
    const provider: any = await axios.get(`${URL}/api/v1/provider/getMe`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    });

    if (provider.emailConfirm === false) {
      console.log('Please confirm your email first!');
    }

    if (provider) {
      console.log(provider.data.data.user, 'qqqqqqqqqqqq');
      return provider.data.data.user;
    }
  } catch (error) {
    console.log(error.response.data.message, 'eeeeeeeeeeeeee');
    //throw new Error(error.response.data.message);
  }
};
