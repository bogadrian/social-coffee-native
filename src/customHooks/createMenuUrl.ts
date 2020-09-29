import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { URL } from '../constants/variables';

import { IUserType } from '../types/user.types';

const useMenuUrl = async (user: IUserType) => {
  const token = await SecureStore.getItemAsync('jwt');
  try {
    const axiosInstance = await axios.create({
      baseURL: `${URL}/api/v1/provider/getCount`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      },
      timeout: 6000
    });

    const response = await axiosInstance({
      method: 'GET'
    });

    const url = `https://socialcoffeeapp.app/${user.slug}-${response.data
      .results++}`;

    return url;
  } catch (err) {
    console.log(err);
  }
};

export default useMenuUrl;
