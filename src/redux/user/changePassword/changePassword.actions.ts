import { IUsersTypes } from '../users.types';

export interface IPasswordValues {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
  u?: string;
}

export const startPasswordChange = (userData: IPasswordValues) => {
  return { type: IUsersTypes.START_CHANGE_PASSWORD, userData };
};

export const changePasswordSuccess = (user: any) => {
  return { type: IUsersTypes.CHANGE_PASSWORD_SUCCESS, user };
};

export const changePasswordFailure = (error: any) => {
  return { type: IUsersTypes.CHANGE_PASSWORD_FAILURE, error };
};
