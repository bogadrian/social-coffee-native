import { IUsersTypes } from './users.types';
import { IUserType } from '../../types/user.types';

export const userGetMeSuccess = (user: IUserType) => {
  return {
    type: IUsersTypes.SUCCESS_USER_GET,
    user
  };
};

export const userGetMeFailure = (error: string) => {
  return {
    type: IUsersTypes.FAILURE_USER_GET,
    error
  };
};
export const userLoginSuccess = (user: IUserType) => {
  return {
    type: IUsersTypes.SUCCESS_LOGIN,
    user
  };
};

export const userLoginFailure = (error: string) => {
  return {
    type: IUsersTypes.FAILURE_LOGIN,
    error
  };
};
export const userSignupSuccess = (user: IUserType) => {
  return {
    type: IUsersTypes.SUCCESS_SIGNUP,
    user
  };
};

export const userSignupFailure = (error: string) => {
  return {
    type: IUsersTypes.FAILURE_SIGNUP,
    error
  };
};

export const cleanUserErrors = () => {
  return { type: IUsersTypes.CLEAN_ERRORS };
};
