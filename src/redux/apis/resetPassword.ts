import axios from 'axios';

import { IUsersTypes } from '../user/users.types';

import { URL } from '../../constants/variables';

interface IValues {
  password: string;
  passwordConfirm: string;
}

interface IResetValues {
  token: string;
  values: IValues;
}

interface IData {
  data: IResetValues;
  type: IUsersTypes;
}

export const makeCallResetPasswordUser = async (data: IData) => {
  const { token } = data.data;
  const { password, passwordConfirm } = data.data.values;

  const body = { password, passwordConfirm };

  try {
    const axiosInstance = await axios.create({
      baseURL: `${URL}/api/v1/users/resetPassword/${token}`,
      headers: {
        'Content-Type': `application/json`
      },
      timeout: 4000
    });

    const userReseted = await axiosInstance({
      method: 'PATCH',
      data: body
    });

    if (userReseted.data.data) {
      return userReseted.data.data.user;
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const makeCallResetPasswordProvider = async (data: IData) => {
  const { token } = data.data;
  const { password, passwordConfirm } = data.data.values;

  const body = { password, passwordConfirm };

  try {
    const axiosInstance = await axios.create({
      baseURL: `${URL}/api/v1/provider/resetPassword/${token}`,
      headers: {
        'Content-Type': `application/json`
      },
      timeout: 4000
    });

    const userReseted = await axiosInstance({
      method: 'PATCH',
      data: body
    });

    if (userReseted.data.data) {
      return userReseted.data.data.user;
    }
  } catch (error) {
    console.log(error.response.data.message);
    //throw new Error(error.response.data.message);
  }
};
