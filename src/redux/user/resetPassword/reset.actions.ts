import { IUsersTypes } from '../users.types';

import { IUserType } from '../../../types/user.Types';

interface IValues {
  password: string;
  passwordConfirm: string;
}

interface IResetValues {
  token: string;
  values: IValues;
}

export const startResetPassword = (data: IResetValues) => {
  return {
    type: IUsersTypes.START_RESET_PASSWORD,
    data
  };
};

export const ressetSuccessPassword = (user: IUserType) => {
  return {
    type: IUsersTypes.SUCCESS_RESET_PASSWORD,
    user
  };
};

export const ressetFailurePassword = (error: string) => {
  return {
    type: IUsersTypes.FAILURE_RESET_PASSWORD,
    error
  };
};
