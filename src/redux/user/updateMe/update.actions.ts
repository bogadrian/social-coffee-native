import { IUsersTypes } from '../users.types';

export const startUpdateMe = (userData: any) => {
  return { type: IUsersTypes.START_UPDATE_ME, userData };
};

export const updateMeSuccess = (user: any) => {
  return { type: IUsersTypes.UPDATE_ME_SUCCESS, user };
};

export const updateMeFailure = (error: any) => {
  return { type: IUsersTypes.UPDATE_ME_FAILURE, error };
};
