import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { URL } from '../../constants/variables';

export const makeCallSignupWithUser = async (user: any) => {
  const data = user.user;

  try {
    const axiosInstance = await axios.create({
      baseURL: `${URL}/api/v1/users/signup`,
      headers: {
        'Content-Type': `application/json`
      },
      timeout: 4000
    });

    const userCreated = await axiosInstance({
      method: 'POST',
      data
    });

    await SecureStore.setItemAsync('jwt', userCreated.data.token);
    return userCreated.data.data.user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const makeCallSignupProvider = async (user: any) => {
  try {
    const axiosInstance = await axios.create({
      baseURL: `${URL}/api/v1/provider/signup`,
      headers: {
        'Content-Type': `application/json`
      },
      timeout: 4000
    });

    const userCreated = await axiosInstance({
      method: 'POST',
      data: user
    });

    await SecureStore.setItemAsync('jwt', userCreated.data.token);
    return userCreated.data.data.user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
