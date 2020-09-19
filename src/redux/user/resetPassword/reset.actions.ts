import { IUsersTypes } from '../users.types';

export const startResetPassword = (data: any) => {
  return {
    type: IUsersTypes.START_RESET_PASSWORD,
    data
  };
};

export const ressetSuccessPassword = (user: any) => {
  return {
    type: IUsersTypes.SUCCESS_RESET_PASSWORD,
    user
  };
};

export const ressetFailurePassword = (error: any) => {
  return {
    type: IUsersTypes.FAILURE_RESET_PASSWORD,
    error
  };
};
