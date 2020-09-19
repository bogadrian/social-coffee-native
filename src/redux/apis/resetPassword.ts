import axios from 'axios';

import { URL } from '../../constants/variables';

export const makeCallResetPasswordUser = async (data: any) => {
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

    return userReseted.data.data.user;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const makeCallResetPasswordProvider = async (data: any) => {
  const { token } = data.data;
  const { password, passwordConfirm } = data.data.values;
  console.log('make call provider', token, password, passwordConfirm);

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

    return userReseted.data.data.user;
  } catch (error) {
    console.log(error.response.data.message);
    //throw new Error(error.response.data.message);
  }
};
