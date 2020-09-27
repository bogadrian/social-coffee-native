import { IUsersTypes } from '../users.types';

import { IUserType } from '../../../types/user.types';

interface IValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signupStartUser = (user: IValues) => {
  return {
    type: IUsersTypes.START_SIGNUP_USER,
    user
  };
};
export const signupStartProvider = (user: IUserType) => {
  return {
    type: IUsersTypes.START_SIGNUP_PROVIDER,
    user
  };
};
