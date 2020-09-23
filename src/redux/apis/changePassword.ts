import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { URL } from '../../constants/variables';

export const makeCallToServerWithUserNewPassword = async (userData: any) => {
  const token = await SecureStore.getItemAsync('jwt');

  const data = userData.userData;

  try {
    const userUpdated = await axios.patch(
      `${URL}/api/v1/users//updateMyPassword`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `application/json`,
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

    return userUpdated.data.data.user;
  } catch (err) {
    throw new Error(err.message);
  }
};
