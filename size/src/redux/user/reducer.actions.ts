import { IUsersTypes } from './users.types';

export const userGetMeSuccess = (user: any) => {
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
export const userLoginSuccess = (user: any) => {
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
export const userSignupSuccess = (user: any) => {
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
