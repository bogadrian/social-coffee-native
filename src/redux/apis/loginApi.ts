import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { URL } from '../../constants/variables';
import { IUsersTypes } from '../user/users.types';

interface IUser {
  email: string;
  password: string;
}

interface ILogin {
  user: IUser;
  type: IUsersTypes;
}
export const makeCallLoginWithUser = async (user: ILogin) => {
  const data = user.user;
  try {
    const axiosInstance = await axios.create({
      baseURL: `${URL}/api/v1/users/login`,
      headers: {
        'Content-Type': `application/json`
      },
      timeout: 4000
    });

    const userLoggedIn = await axiosInstance({
      method: 'POST',
      data
    });

    await SecureStore.setItemAsync('jwt', userLoggedIn.data.token);
    return userLoggedIn.data.data.user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const makeCallLoginProvider = async (user: any) => {
  const data = user.user;

  try {
    const axiosInstance = await axios.create({
      baseURL: `${URL}/api/v1/provider/login`,
      headers: {
        'Content-Type': `application/json`
      },
      timeout: 4000
    });

    const userLoggedIn = await axiosInstance({
      method: 'POST',
      data
    });

    await SecureStore.setItemAsync('jwt', userLoggedIn.data.token);

    return userLoggedIn.data.data.user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
