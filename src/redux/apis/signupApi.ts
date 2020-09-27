import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { URL } from '../../constants/variables';

import { IUsersTypes } from '../user/users.types';

interface IValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address?: string;
}

interface ISagaValues {
  user: IValues;
  type: IUsersTypes;
}
export const makeCallSignupWithUser = async (user: ISagaValues) => {
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

export const makeCallSignupProvider = async (user: ISagaValues) => {
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
