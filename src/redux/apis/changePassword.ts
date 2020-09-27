import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { URL } from '../../constants/variables';
import { IPasswordValues } from '../user/changePassword/changePassword.actions';
import { IUsersTypes } from '../user/users.types';

interface IData {
  type: IUsersTypes;
  userData: IPasswordValues;
}
export const makeCallToServerWithUserNewPassword = async (userData: IData) => {
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

export const makeCallToServerWithProviderNewPassword = async (
  userData: IData
) => {
  const token = await SecureStore.getItemAsync('jwt');

  const data = userData.userData;

  try {
    const userUpdated = await axios.patch(
      `${URL}/api/v1/provider/updateMyPassword`,
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
