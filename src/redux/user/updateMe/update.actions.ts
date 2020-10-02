import { IUsersTypes } from '../users.types';

import { IUserType } from '../../../types/user.types';

interface IUpdateValues {
  name: string;
  description: string;
  images: string[];
  u?: string;
}

interface IUploadValues {
  pdf: any;
}

export const startUpdateMe = (userData: IUpdateValues) => {
  return { type: IUsersTypes.START_UPDATE_ME, userData };
};

export const updateMeSuccess = (user: IUserType) => {
  return { type: IUsersTypes.UPDATE_ME_SUCCESS, user };
};

export const updateMeFailure = (error: string) => {
  return { type: IUsersTypes.UPDATE_ME_FAILURE, error };
};

export const startUpload = (pdf: IUploadValues) => {
  return { type: IUsersTypes.UPLOAD_START, pdf };
};

export const uploadSuccess = (user: IUserType) => {
  return { type: IUsersTypes.UPLOAD_SUCCESS, user };
};

export const uploadFailure = (error: string) => {
  return { type: IUsersTypes.UPLOAD_FAILURE, error };
};
