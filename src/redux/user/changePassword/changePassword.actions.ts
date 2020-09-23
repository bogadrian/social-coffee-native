import { IUsersTypes } from '../users.types';

export const startPasswordChange = (userData: any) => {
  return { type: IUsersTypes.START_CHANGE_PASSWORD, userData };
};

export const changePasswordSuccess = (user: any) => {
  return { type: IUsersTypes.CHANGE_PASSWORD_SUCCESS, user };
};

export const changePasswordFailure = (error: any) => {
  console.log('errrrorror', error);
  return { type: IUsersTypes.CHANGE_PASSWORD_FAILURE, error };
};
